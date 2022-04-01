import BackgroundImageController from "./BackgroundImage";
import BookmarkController from "./Bookmark";
import NoteController from "./Note";
import QuickLinkController from "./QuickLink";

const AppController = {
  note: NoteController,
  backgroundimage: BackgroundImageController,
  quicklink: QuickLinkController,
  bookmark: BookmarkController,
};

export default AppController;
