import db from "./db";

const NoteSchema = db.note.defineClass({
  noteid: Number,
  notename: String,
  firstlevel: Boolean,
  parentnoteid: Number,
  expanded: Boolean, // if the note is a parent note it can be expanded
  index: Number,
});

class Note extends NoteSchema {
  async save() {
    try {
      const noteid = await db.note.put(this, this.noteid);
      this.noteid = noteid;
      return noteid;
    } catch (error) {
      if ((error.message || "").includes("notename")) {
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
