import BackgroundImageController from "./BackgroundImage";
import NoteController from "./Note";
import QuickLinkController from "./QuickLink";

const AppController = {
  note: NoteController,
  backgroundimage: BackgroundImageController,
  quicklink: QuickLinkController,
};

export default AppController;