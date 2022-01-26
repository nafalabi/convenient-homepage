import InternalBackgroundImageAPI from "./BackgroundImage";
import InternalNoteAPI from "./Note";

const InternalAPI = {
  note: InternalNoteAPI,
  backgroundimage: InternalBackgroundImageAPI,
};

export default InternalAPI;

declare global {
  var dexieapi: typeof InternalAPI;
}

global.dexieapi = InternalAPI;
