import { Collection } from "dexie";
import dexieDB from "../../storage/dexie/db";
import Note from "../../storage/dexie/Note";
import NoteContent from "../../storage/dexie/NoteContent";

class DexieNoteAPI {
  /**
   * Get Note List in a form of tree list
   * @returns list of notes in tree form
   */
  fetchNoteList() {
    const map = async (coll: Collection<Note>) => {
      const result: Note[] = [];
      await coll.each(
        async (row: { totalChildren?: number; children?: Note[] } & Note) => {
          // calculating total children of the current note / page
          row.totalChildren = await row.countChildren();

          // if the page / note is expanded, then fetch also its children
          if (row.expanded && row.totalChildren) {
            const children = await map(row.getChildrenAsCollection());
            row.children = children;
          }

          result[row.order] = row;
        }
      );
      return result;
    };
    return map(dexieDB.note.where("firstlevel").equals(1));
  }

  /**
   * Get the detail of note (from note & notecontent table)
   * @param noteid note id
   * @returns the detail of a note
   */
  async fetchNoteData(noteid: string) {
    const data: (Note & NoteContent) | undefined = await dexieDB.note
      .where({ noteid: parseInt(noteid) })
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
  async fetchExpandedNoteIds() {
    let ids = await dexieDB.note.where("expanded").equals(1).primaryKeys();
    return ids.map((id) => String(id));
  }

  /**
   * Update note name
   * @param noteData note data to be updated
   * @param newName new note name
   * @returns note id
   */
  async updateNoteName(noteData: Note, newName: string) {
    noteData.notename = newName;
    return await noteData.save();
  }

  /**
   * Update note content
   * @param noteData note data to be updated
   * @param notecontent new note content
   * @returns note id
   */
  async updateNoteContent(noteData: Note, notecontent: string) {
    const noteContent = new NoteContent();
    noteContent.noteid = noteData.noteid;
    noteContent.notecontent = notecontent;
    return await noteContent.save();
  }

  /**
   * Search Note
   * @param term string to be seached (part of note name)
   * @returns list of note
   */
  async searchNote(term: string) {
    return await dexieDB.note
      .where("notename")
      .startsWithIgnoreCase(term)
      .toArray();
  }

  /**
   * Add sub note into a note
   * @param noteData note data to be updated
   * @param notename new sub note name
   * @returns note id
   */
  async addSubNote(noteData: Note, notename: string) {
    return dexieDB.transaction(
      "rw",
      dexieDB.note,
      dexieDB.notecontent,
      async () => {
        const order = await dexieDB.note
          .where("parentnoteid")
          .equals(noteData.noteid ?? 0)
          .count();

        const newNote = new Note();
        newNote.notename = notename;
        newNote.firstlevel = 0;
        newNote.parentnoteid = noteData.noteid;
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
  async addNewNote(notename: string) {
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
  async toggleExpandNote(oldIds: string[], newIds: string[]) {
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
  async reorderNote(
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
  async deleteNote(noteData: Note) {
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
  async findNoteById(noteid: string) {
    return await dexieDB.note.where({ noteid: parseInt(noteid) }).first();
  }
}

export default DexieNoteAPI;
