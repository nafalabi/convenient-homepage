import DexieBackgroundImageAPI from "./BackgroundImage";
import DexieNoteAPI from "./Note";

const DexieAPI = {
  note: DexieNoteAPI,
  backgroundimage: DexieBackgroundImageAPI,
};

export default DexieAPI;

declare global {
  var dexieapi: typeof DexieAPI;
}

global.dexieapi = DexieAPI;
