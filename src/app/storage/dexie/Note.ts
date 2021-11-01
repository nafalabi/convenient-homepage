import db from "./db";

export interface INote {
  noteid?: number;
  notename?: string;
  firstlevel?: 0 | 1;
  parentnoteid?: number;
  expanded?: 0 | 1; // if the note is a parent note it can be expanded
  index?: number;
}

class Note implements INote {
  noteid?: number;
  notename?: string;
  firstlevel?: 0 | 1;
  parentnoteid?: number;
  expanded?: 0 | 1;
  index?: number;

  async save() {
    try {
      const noteid = await db.note.put(this, this.noteid);
      this.noteid = noteid;
      return noteid;
    } catch (error: any) {
      if ((error?.message ?? "").includes("notename")) {
        const errorModified = Object.assign({}, error);
        errorModified.message =
          "The note name is already used, please use another name";
        throw errorModified;
      }
      throw error;
    }
  }
}

db.note.mapToClass(Note);

export default Note;
