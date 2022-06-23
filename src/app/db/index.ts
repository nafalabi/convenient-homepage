import Dexie from "dexie";
import BackgroundImageModel from "./model/BackgroundImage";
import NoteModel from "./model/Note";
import NoteContentModel from "./model/NoteContent";
import QuickLinkModel from "./model/QuickLink";
import { exportDB, importInto } from "dexie-export-import";
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

dexieDB.export = async function (options) {
  const dbBlob = await exportDB(this, options);
  const objUrl = URL.createObjectURL(dbBlob);
  const version = this.verno;

  chrome.downloads.download(
    {
      url: objUrl,
      filename: `convenient-homepage-db-dump-v${version}.json`,
    },
    () => {
      URL.revokeObjectURL(objUrl);
    }
  );

  return dbBlob;
};

dexieDB.import = async function (blobDb, options) {
  const combinedOptions = {
    acceptNameDiff: true,
    acceptVersionDiff: true,
    acceptChangedPrimaryKey: true,
    acceptMissingTables: true,
    clearTablesBeforeImport: true,
    overwriteValues: true,
    noTransaction: true,
    ...options,
  };

  await importInto(this, blobDb, combinedOptions);
};

export default dexieDB;
