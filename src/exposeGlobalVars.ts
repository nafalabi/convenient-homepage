import ImageAPI from "app/api/image-api";
import AppController from "app/controller";
import dexieDB, { DexieDB } from "app/db";
import appData from "app/storage/app-data";
import { backgroundSettingsDefault } from "app/storage/app-data/backgroundSettings";
import LocalData from "app/storage/local-data";

declare global {
  var globalImageAPI: ImageAPI | undefined;
  var gloablAppController: typeof AppController | undefined;
  var globalDB: DexieDB | undefined;
  var globalAppData: typeof appData | undefined;
  var globalLocalData: typeof LocalData | undefined;
}

// Expose utility variables
// intended for debugging and development purposes
const exposeGlobalVars = () => {
  if (process.env.NODE_ENV === "production") return;
  global.globalLocalData = LocalData;
  global.globalAppData = appData;
  global.globalDB = dexieDB;
  global.gloablAppController = AppController;
  global.globalImageAPI = new ImageAPI(backgroundSettingsDefault);
};

export default exposeGlobalVars;
