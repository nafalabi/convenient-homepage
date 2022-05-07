import Dexie from "dexie";
import BackgroundImageModel from "./model/BackgroundImage";
import NoteModel from "./model/Note";
import NoteContentModel from "./model/NoteContent";
import QuickLinkModel from "./model/QuickLink";
import {
  exportDB,
  ExportOptions,
  importInto,
  ImportOptions,
} from "dexie-export-import";
import defineSchema from "./migration/wrapper";

export class DexieDB extends Dexie {
  note: Dexie.Table<NoteModel, number>;
  notecontent: Dexie.Table<NoteContentModel, number>;
  backgroundimage: Dexie.Table<BackgroundImageModel, number>;
  quicklink: Dexie.Table<QuickLinkModel, number>;

  constructor() {
    super("convenient-homepage");

    defineSchema(this);

    this.note = this.table("note");
    this.notecontent = this.table("notecontent");
    this.backgroundimage = this.table("backgroundimage");
    this.quicklink = this.table("quicklink");
  }
}

const dexieDB = new DexieDB();

dexieDB.export = async function (options: ExportOptions) {
  const blob = await exportDB(this, options);
  return blob;
};

dexieDB.import = async function (blobDb, options: ImportOptions) {
  return await importInto(this, blobDb, options);
};

export default dexieDB;
