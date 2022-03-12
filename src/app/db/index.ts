import Dexie from "dexie";
import BackgroundImageModel from "./model/BackgroundImage";
import NoteModel from "./model/Note";
import NoteContentModel from "./model/NoteContent";
import QuickLinkModel from "./model/QuickLink";

export class DexieDB extends Dexie {
  note: Dexie.Table<NoteModel, number>;
  notecontent: Dexie.Table<NoteContentModel, number>;
  backgroundimage: Dexie.Table<BackgroundImageModel, number>;
  quicklink: Dexie.Table<QuickLinkModel, number>;

  constructor() {
    super("convenient-homepage");

    this.version(28).stores({
      note: "++noteid, notename, firstlevel, parentnoteid, expanded, [parentnoteid+notename], order",
      notecontent: "&noteid",
      backgroundimage: "++id, active, activated_at, provider",
      quicklink: "++id, order",
    });

    this.note = this.table("note");
    this.notecontent = this.table("notecontent");
    this.backgroundimage = this.table("backgroundimage");
    this.quicklink = this.table("quicklink");
  }
}

const dexieDB = new DexieDB();

export default dexieDB;

// for debug purpose only
declare global {
  var db: DexieDB;
}
global.db = dexieDB;
