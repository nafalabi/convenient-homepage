import db from "./db";

const NoteContentSchema = db.notecontent.defineClass({
  noteid: Number,
  // notecontent: String, // unindexed
});

class NoteContent extends NoteContentSchema {
  async save() {
    try {
      const noteid = await db.notecontent.put(this, this.noteid);
      this.noteid = noteid;
      return noteid;
    } catch (error) {
      if (String(error?.message).includes("noteid")) {
        const errorModified = Object.assign({}, error);
        errorModified.message =
          "Note Content should only be saved to one noteid";
        throw errorModified;
      }
      throw error;
    }
  }
}

db.notecontent.mapToClass(NoteContent);

export default NoteContent;
