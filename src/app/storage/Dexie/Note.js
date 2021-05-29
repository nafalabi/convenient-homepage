import db from "./db";

const NoteSchema = db.note.defineClass({
  noteid: Number,
  notename: String,
  // notecontent: String, // unindexed
  firstlevel: Boolean,
  parentnoteid: Number,
  expanded: Boolean, // if the note is a parent note it can be expanded
});

class Note extends NoteSchema {
  async save() {
    const noteid = await db.note.put(this, this.noteid);
    this.noteid = noteid;
    return noteid;
  }
}

db.note.mapToClass(Note);

export default Note;
