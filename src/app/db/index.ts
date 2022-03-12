import Dexie from "dexie";
import BackgroundImage from "./schema/BackgroundImage";
import Note from "./schema/Note";
import NoteContent from "./schema/NoteContent";
import QuickLink from "./schema/QuickLink";

export class DexieDB extends Dexie {
  note: Dexie.Table<Note, number>;
  notecontent: Dexie.Table<NoteContent, number>;
  backgroundimage: Dexie.Table<BackgroundImage, number>;
  quicklink: Dexie.Table<QuickLink, number>;

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
