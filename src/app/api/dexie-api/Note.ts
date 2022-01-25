import { Collection } from "dexie";
import { IconData } from "components/IconPicker/types";
import dexieDB from "app/storage/dexie/db";
import Note from "app/storage/dexie/Note";
import NoteContent from "app/storage/dexie/NoteContent";

export type NoteListItem = Note & { totalChildren?: number; children?: Note[] };

class DexieNoteAPI {
  /**
   * Get Note List in a form of tree list
   * @returns list of notes in tree form
   */
  static fetchNoteList() {
    const map = async (coll: Collection<Note>) => {
      const result: NoteListItem[] = [];
      await coll.each(async (row: NoteListItem) => {
        // calculating total children of the current note / page
        row.totalChildren = await row.countChildren();

        // if the page / note is expanded, then fetch also its children
        if (row.expanded && row.totalChildren) {
          const children = await map(row.getChildrenAsCollection());
          row.children = children;
        }

        result[row.order] = row;
      });
      return result;
    };
    return map(dexieDB.note.where("firstlevel").equals(1));
  }

  /**
   * Get the detail of note (from note & notecontent table)
   * @param noteid note id
   * @returns the detail of a note
   */
  static async fetchNoteData(noteid: string | number) {
    const data: (Note & NoteContent) | undefined = await dexieDB.note
      .where({ noteid: Number(noteid) })
      .first();
    const noteContent = await dexieDB.notecontent
      .where({ noteid: data?.noteid ?? 0 })
      .first();
    if (data) data.notecontent = noteContent?.notecontent;
    return data;
  }

  /**
   * Get list id of expanded notes
   * @returns list id of expanded notes
   */
  static async fetchExpandedNoteIds() {
    let ids = await dexieDB.note.where("expanded").equals(1).primaryKeys();
    return ids.map((id) => String(id));
  }

  /**
   * Update note name
   * @param noteid note id to be updated
   * @param newName new note name
   * @returns note id
   */
  static async updateNoteName(noteid: string | number, newName: string) {
    const noteData = await this.fetchNoteData(noteid);
    // not found, skip
    if (!noteData) return;

    noteData.notename = newName;
    return await noteData.save();
  }

  /**
   * Update note content
   * @param noteid note id to be updated
   * @param notecontent new note content
   * @returns note id
   */
  static async updateNoteContent(noteid: string | number, notecontent: string) {
    const noteContent = new NoteContent();
    noteContent.noteid = noteid as number;
    noteContent.notecontent = notecontent;
    return await noteContent.save();
  }

  /**
   * Search Note
   * @param term string to be seached (part of note name)
   * @returns list of note
   */
  static async searchNote(term: string, fullText: boolean = false) {
    if (!fullText) {
      return await dexieDB.note
        .where("notename")
        .startsWithIgnoreCase(term)
        .toArray();
    } else {
      return await dexieDB.note
        .filter((note) => {
          return (
            note.notename
              ?.toLocaleLowerCase()
              .includes(term.toLocaleLowerCase()) ?? false
          );
        })
        .toArray();
    }
  }

  /**
   * Add sub note into a note
   * @param parentnoteid parent note of the sub note
   * @param notename new sub note name
   * @returns note id
   */
  static async addSubNote(parentnoteid: string | number, notename: string) {
    return dexieDB.transaction(
      "rw",
      dexieDB.note,
      dexieDB.notecontent,
      async () => {
        const order = await dexieDB.note
          .where("parentnoteid")
          .equals(Number(parentnoteid))
          .count();

        const newNote = new Note();
        newNote.notename = notename;
        newNote.firstlevel = 0;
        newNote.parentnoteid = Number(parentnoteid);
        newNote.order = order;
        const noteid = await newNote.save();

        const newNoteContent = new NoteContent();
        newNoteContent.noteid = noteid;
        newNoteContent.notecontent = `# ${notename}\n\n\n`;
        await newNoteContent.save();
        return noteid;
      }
    );
  }

  /**
   * Add new note
   * @param notename new note name
   * @returns note id
   */
  static async addNewNote(notename: string) {
    return dexieDB.transaction(
      "rw",
      dexieDB.note,
      dexieDB.notecontent,
      async () => {
        const order = await dexieDB.note.where("firstlevel").equals(1).count();

        const newNote = new Note();
        newNote.notename = notename;
        newNote.firstlevel = 1;
        newNote.parentnoteid = 0;
        newNote.order = order;
        const noteid = await newNote.save();

        const newNoteContent = new NoteContent();
        newNoteContent.noteid = noteid;
        newNoteContent.notecontent = `# ${notename}\n\n\n`;
        await newNoteContent.save();
        return noteid;
      }
    );
  }

  /**
   * Toggle expand note
   * @param oldIds old list of id of expanded notes
   * @param newIds new list of id of expanded notes
   * @returns
   */
  static async toggleExpandNote(oldIds: string[], newIds: string[]) {
    const idToBeExpanded = newIds.find((id) => !oldIds.includes(id));
    const idToBeShrinked = oldIds.find((id) => !newIds.includes(id));
    if (idToBeExpanded) {
      await dexieDB.note.update(parseInt(idToBeExpanded), { expanded: 1 });
    }
    if (idToBeShrinked) {
      await dexieDB.note.update(parseInt(idToBeShrinked), { expanded: 0 });
    }
  }

  /**
   *
   * @param noteid note that will be moved
   * @param targetid destination
   * @param targetType
   */
  static async reorderNote(
    noteid: string,
    targetid: string,
    targetType: "BEFORE" | "INSIDE" | "AFTER",
    targetIndex: number
  ) {
    if (parseInt(noteid) === parseInt(targetid)) return;

    await dexieDB
      .transaction("rw", dexieDB.note, async () => {
        const note = await this.findNoteById(String(noteid));
        const targetNote = await this.findNoteById(String(targetid));

        if (note === undefined || targetNote === undefined) return;

        if (await targetNote.isChildOf(note.noteid)) return;

        await dexieDB.note
          .where("parentnoteid")
          .equals(note.parentnoteid ?? 0)
          .modify(async (row) => {
            if (row.order > note.order) {
              row.order -= 1;
            }
          });

        const isTargetFirstLevel =
          targetNote.parentnoteid === 0 ||
          targetNote.parentnoteid === undefined;
        const futureSiblingsCollection = isTargetFirstLevel
          ? dexieDB.note.where("firstlevel").equals(1)
          : dexieDB.note
              .where("parentnoteid")
              .equals(targetNote.parentnoteid ?? -1);

        switch (targetType) {
          case "BEFORE":
            await futureSiblingsCollection.modify(async (row) => {
              if (row.order >= targetIndex) row.order += 1;
            });
            note.order = targetIndex;
            note.parentnoteid = isTargetFirstLevel
              ? 0
              : targetNote.parentnoteid;
            note.firstlevel = isTargetFirstLevel ? 1 : 0;
            break;
          case "AFTER":
            await futureSiblingsCollection.modify(async (row) => {
              if (row.order > targetIndex) row.order += 1;
            });
            note.order = targetIndex + 1;
            note.parentnoteid = isTargetFirstLevel
              ? 0
              : targetNote.parentnoteid;
            note.firstlevel = isTargetFirstLevel ? 1 : 0;
            break;
          case "INSIDE":
            note.order = await targetNote.countChildren();
            note.parentnoteid = targetNote.noteid;
            note.firstlevel = 0;
            break;
          default:
            break;
        }

        await note.save();
      })
      .catch((e) => console.log(e));
  }

  /**
   * Delete a note
   * @param noteData note data to be deleted
   * @returns nothing (void)
   */
  static async deleteNote(noteid: string | number) {
    const noteData = await this.fetchNoteData(noteid);
    // not found, skip
    if (noteData === undefined) return;

    const totalChildren = await noteData.countChildren();

    if (totalChildren > 0) {
      throw Error("Couldn't delete, the note still has children");
    }

    await dexieDB.transaction(
      "rw",
      dexieDB.note,
      dexieDB.notecontent,
      async () => {
        await dexieDB.notecontent.delete(noteData.noteid ?? 0);
        await dexieDB.note.delete(noteData.noteid ?? 0);
      }
    );
  }

  /**
   * Find note by id
   * @param noteid note id to search
   * @returns a note
   */
  static async findNoteById(noteid: string) {
    return await dexieDB.note.where({ noteid: parseInt(noteid) }).first();
  }

  /**
   * Update the icon of a note
   * @param noteid note id to update
   * @param iconData new icon data
   * @returns void
   */
  static async updateNoteIcon(noteid: string | number, iconData: IconData) {
    const note = await this.fetchNoteData(noteid);
    // not found, skip
    if (note === undefined) return;

    note.iconId = iconData?.iconId;
    note.iconType = iconData?.iconType;
    note.save();
  }
}

export default DexieNoteAPI;
