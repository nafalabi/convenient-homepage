import { Collection } from "dexie";
import { IconData } from "components/IconPicker/types";
import dexieDB from "app/db";
import NoteModel from "app/db/model/Note";
import NoteContentModel from "app/db/model/NoteContent";

export type NoteListItem = NoteModel & {
  totalChildren?: number;
  children?: NoteModel[];
};

export const FIRST_LEVEL_PARENTNOTE_ID = 0;

class NoteController {
  /**
   * Get Note List in a form of tree list
   * @returns list of notes in tree form
   */
  static fetchNoteList() {
    const map = async (coll: Collection<NoteModel>) => {
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
    return map(
      dexieDB.note.where("parentnoteid").equals(FIRST_LEVEL_PARENTNOTE_ID)
    );
  }

  /**
   * Get the detail of note (from note & notecontent table)
   * @param noteid note id
   * @returns the detail of a note
   */
  static async fetchNoteData(noteid: string | number) {
    const data: (NoteModel & NoteContentModel) | undefined = await dexieDB.note
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
    const noteContent = new NoteContentModel();
    noteContent.noteid = Number(noteid);
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

        const newNote = new NoteModel();
        newNote.notename = notename;
        newNote.parentnoteid = Number(parentnoteid);
        newNote.order = order;
        const noteid = await newNote.save();

        const newNoteContent = new NoteContentModel();
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
        const order = await dexieDB.note
          .where("parentnoteid")
          .equals(FIRST_LEVEL_PARENTNOTE_ID)
          .count();

        const newNote = new NoteModel();
        newNote.notename = notename;
        newNote.parentnoteid = 0;
        newNote.order = order;
        const noteid = await newNote.save();

        const newNoteContent = new NoteContentModel();
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
    targetType: "BEFORE" | "INSIDE" | "AFTER"
  ) {
    if (parseInt(noteid) === parseInt(targetid)) return;

    await dexieDB
      .transaction("rw", dexieDB.note, async () => {
        // getting and validating source note
        const note = await this.findNoteById(String(noteid));
        if (note === undefined) throw Error("Source note does not exist");

        // Rearrangements of old siblings
        const totalOldSiblings = await dexieDB.note
          .where({
            parentnoteid: note.parentnoteid ?? FIRST_LEVEL_PARENTNOTE_ID,
          })
          .count();
        await dexieDB.note
          .where(["parentnoteid", "order"])
          .between(
            [note.parentnoteid ?? 0, note.order],
            [note.parentnoteid ?? 0, totalOldSiblings]
          )
          .modify(async (row) => {
            if (row.order > note.order) row.order -= 1;
          });

        // getting and validating target note
        const targetNote = await this.findNoteById(String(targetid));
        if (targetNote === undefined) throw Error("Target note does not exist");
        if (await targetNote.isChildOf(note.noteid))
          throw Error("Target note is a descendant of source note");

        // defining variables
        const nextParentNoteId =
          targetNote.parentnoteid ?? FIRST_LEVEL_PARENTNOTE_ID;
        const nextSiblingsCollection = dexieDB.note
          .where("parentnoteid")
          .equals(nextParentNoteId);

        // final rearrangements
        switch (targetType) {
          case "BEFORE":
            await nextSiblingsCollection.modify(async (row) => {
              if (row.order >= targetNote.order) row.order += 1;
            });
            note.order = targetNote.order;
            note.parentnoteid = nextParentNoteId;
            break;
          case "AFTER":
            await nextSiblingsCollection.modify(async (row) => {
              if (row.order > targetNote.order + 1) row.order += 1;
            });
            note.order = targetNote.order + 1;
            note.parentnoteid = nextParentNoteId;
            break;
          case "INSIDE":
            note.order = await targetNote.countChildren();
            note.parentnoteid = targetNote.noteid;
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

export default NoteController;
