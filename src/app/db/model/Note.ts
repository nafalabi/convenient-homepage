import { IconType } from "app/constant";
import db from "app/db";
import { v4 as uuidv4 } from "uuid";

class NoteModel {
  noteid?: number;
  ref?: string;
  notename?: string;
  parentnoteid?: number = 0;
  expanded?: 0 | 1;
  order: number = 0;
  iconId?: string = "Subject";
  iconType?: IconType = IconType.MATERIAL_ICON;

  async countChildren() {
    if (!this.noteid) return 0;
    return await db.note.where("parentnoteid").equals(this.noteid).count();
  }

  async isChildOf(id: number | undefined) {
    if (id === undefined) return true;

    let result = false;
    let seqid = this.parentnoteid;

    while (true) {
      if (seqid === undefined || seqid === 0) {
        result = false;
        break;
      }

      if (seqid === id) {
        result = true;
        break;
      }

      const parent = await db.note.where({ noteid: seqid }).first();

      if (parent === undefined) {
        result = false;
        break;
      }

      seqid = parent.parentnoteid;
    }

    return result;
  }

  getChildrenAsCollection() {
    return db.note.where("parentnoteid").equals(this.noteid ?? 0);
  }

  async save() {
    try {
      if (!this.ref) this.ref = uuidv4();
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

db.note.mapToClass(NoteModel);

export default NoteModel;
