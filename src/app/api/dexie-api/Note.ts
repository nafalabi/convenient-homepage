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

          result.push(row);
        }
      );
      return result.sort((a, b) => a.order - b.order);
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
    return await db.note.where("notename").startsWithIgnoreCase(term).toArray();
  }

  /**
   * Add sub note into a note
   * @param noteData note data to be updated
   * @param notename new sub note name
   * @returns note id
   */
  async addSubNote(noteData: Note, notename: string) {
    const newNote = new Note();
    newNote.notename = notename;
    newNote.firstlevel = 0;
    newNote.parentnoteid = noteData.noteid;
    const noteid = await newNote.save();
    const newNoteContent = new NoteContent();
    newNoteContent.noteid = noteid;
    newNoteContent.notecontent = `# ${notename}\n\n\\\n`;
    await newNoteContent.save();
    return noteid;
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

    return await db.note.delete(noteData.noteid ?? 0);
  }

  /**
   * Find note by id
   * @param noteid note id to search
   * @returns a note
   */
  async findNoteById(noteid: string) {
    return await db.note.where({ noteid: parseInt(noteid) }).first();
  }
}

export default DexieNoteAPI;
