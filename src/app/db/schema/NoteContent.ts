import db from "app/db";

class NoteContent {
  noteid?: number;
  notecontent?: string;

  async save() {
    try {
      const noteid = await db.notecontent.put(this, this.noteid);
      this.noteid = noteid;
      return noteid;
    } catch (error: any) {
      if (String(error?.message ?? "").includes("noteid")) {
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
