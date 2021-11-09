import db from "./db";

class Note {
  noteid?: number;
  notename?: string;
  firstlevel?: 0 | 1;
  parentnoteid?: number;
  expanded?: 0 | 1;
  order: number = 0;

  async countChildren() {
    if (!this.noteid) return 0;
    return await db.note.where("parentnoteid").equals(this.noteid).count();
  }

  getChildrenAsCollection() {
    return db.note.where("parentnoteid").equals(this.noteid ?? 0);
  }

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
