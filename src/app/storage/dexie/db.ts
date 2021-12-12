import Dexie from "dexie";
import Background from "./Background";
import Note from "./Note";
import NoteContent from "./NoteContent";

export class DexieDB extends Dexie {
  background: Dexie.Table<Background, number>;
  note: Dexie.Table<Note, number>;
  notecontent: Dexie.Table<NoteContent, number>;

  constructor() {
    super("convenient-homepage");

    this.version(10).stores({
      note: "++noteid, notename, firstlevel, parentnoteid, expanded, [parentnoteid+notename], order",
      notecontent: "&noteid",
      background: "++backgroundid, downloadtime, expireat",
    });

    this.background = this.table("background");
    this.note = this.table("note");
    this.notecontent = this.table("notecontent");
  }
}

const dexieDB = new DexieDB();

export default dexieDB;

// for debug purpose only
declare global {
  var db: DexieDB;
}
global.db = dexieDB;
