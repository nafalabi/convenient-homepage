import db from "./db";

export interface IBackground {
  backgroundid?: number;
  downloadtime?: number;
  expireat?: number;
  content?: string;
}

class Background implements IBackground {
  backgroundid?: number;
  downloadtime?: number;
  expireat?: number;
  content?: string;

  async save() {
    const backgroundid = await db.background.put(this, this.backgroundid);
    this.backgroundid = backgroundid;
    return backgroundid;
  }

  async delete() {
    return await db.background.delete(this.backgroundid ?? -1);
  }
}

db.background.mapToClass(Background);

export default Background;
