import InternalBackgroundImageAPI from "./BackgroundImage";
import InternalNoteAPI from "./Note";
import InternalQuickLinkAPI from "./QuickLink";

const InternalAPI = {
  note: InternalNoteAPI,
  backgroundimage: InternalBackgroundImageAPI,
  quicklink: InternalQuickLinkAPI,
};

export default InternalAPI;

declare global {
  var dexieapi: typeof InternalAPI;
}

global.dexieapi = InternalAPI;
