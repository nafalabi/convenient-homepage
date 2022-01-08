import DexieBackgroundImageAPI from "./BackgroundImage";
import DexieNoteAPI from "./Note";

const DexieAPI = {
  note: new DexieNoteAPI(),
  backgroundimage: new DexieBackgroundImageAPI(),
};

export default DexieAPI;

declare global {
  var dexieapi: typeof DexieAPI;
}

global.dexieapi = DexieAPI;
