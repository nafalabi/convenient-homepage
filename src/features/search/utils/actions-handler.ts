import store from "app/redux/store";
import { actions as bookmarkActions } from "features/bookmark/slice";
import { actions as noteActions } from "features/note/slice";
import { actions as settingActions } from "features/settings/slice";
import { actions as searchActions } from "../slice";
import { PredefinedActionsIds } from "./predefined-actions";
import { SearchItem, SearchItemType } from "../types";
import { actions as drawerActions } from "features/drawer/slice";

export const handleActions = async (item: SearchItem, keyword?: string) => {
  const { id, type } = item;

  switch (type) {
    case SearchItemType.NOTE:
      const noteid = typeof id === "number" ? id : parseInt(id);
      handleOpenNotes(noteid);
      break;
    case SearchItemType.BOOKMARKS:
      const bookmarkid = typeof id === "string" ? id : String(id);
      handleVisitBookmarks(bookmarkid);
      break;
    case SearchItemType.PREDEFINED_ACTIONS:
      switch (id) {
        case PredefinedActionsIds.OPEN_BOOKMARKS:
          handleOpenBookmarks();
          break;
        case PredefinedActionsIds.OPEN_NOTES:
          handleOpenNotes();
          break;
        case PredefinedActionsIds.OPEN_SETTINGS:
          handleOpenSettings();
          break;
        case PredefinedActionsIds.SEARCH_ON_INTERNET:
          handleSearchOnInternet(keyword);
          break;
        case PredefinedActionsIds.OPEN_CHROME_APPS:
          handleOpenChromeApps();
          break;
        case PredefinedActionsIds.OPEN_ORIGINAL_HOMEPAGE:
          handleOpenOriginalHomepage();
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }

  store.dispatch(searchActions.closeSearch());
};

export const handleOpenNotes = async (noteid?: number) => {
  store.dispatch(noteActions.toggleNote());
  if (noteid !== undefined) store.dispatch(noteActions.selectNote(noteid));
};

export const handleOpenSettings = async () => {
  store.dispatch(settingActions.toggleSettings());
};

export const handleOpenBookmarks = async (bookmarkid?: string) => {
  store.dispatch(bookmarkActions.toggleBookmark());
  if (bookmarkid !== undefined)
    store.dispatch(bookmarkActions.selectBookmark(bookmarkid));
};

export const handleVisitBookmarks = async (bookmarkid?: string) => {
  const bookmark: chrome.bookmarks.BookmarkTreeNode = await new Promise(
    (resolve) => chrome.bookmarks.get(bookmarkid ?? "", ([bm]) => resolve(bm))
  );
  if (bookmark.url !== undefined) {
    window.location.href = bookmark.url;
  } else {
    handleOpenBookmarks(bookmarkid);
  }
};

export const handleSearchOnInternet = async (keyword?: string) => {
  if (keyword === undefined) return;
  chrome.search.query({ disposition: "CURRENT_TAB", text: keyword }, () => {});
};

export const handleOpenChromeApps = () => {
  drawerActions.handleOpenChromeApps();
};

export const handleOpenOriginalHomepage = () => {
  drawerActions.handleOpenOriginalHomepage();
};
