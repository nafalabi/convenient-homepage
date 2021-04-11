import db from "./db";

const BackgroundSchema = db.background.defineClass({
  backgroundid: Number,
  downloadtime: Number,
  expireat: Number,
});

class Background extends BackgroundSchema {
  async save() {
    const backgroundid = await db.background.put(this, this.backgroundid);
    this.backgroundid = backgroundid;
    return backgroundid;
  }
}

db.background.mapToClass(Background);

export default Background;
