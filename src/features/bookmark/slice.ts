import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import AppController from "app/controller";
import QueryString from "app/utils/querystring";
import { DefaultRootState } from "react-redux";
import { history } from "routes/CustomRouter";

export const HOME_BOOKMARK = 0;

export interface BookmarkSliceState {
  isOpen: boolean;
  selectedBookmark: number | string;
  folderStack: chrome.bookmarks.BookmarkTreeNode[];
  layout: { mode: "list" | "grid" };
  expandedTreeNodeIds: string[];
}

const initialState: BookmarkSliceState = {
  isOpen: false,
  selectedBookmark: HOME_BOOKMARK,
  folderStack: [],
  layout: {
    mode: "list", // possible values - grid, list
  },
  expandedTreeNodeIds: [],
};

const slice = createSlice({
  initialState,
  name: "bookmark",
  reducers: {
    setOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
    },
    selectBookmark: (state, { payload: bookmarkId }) => {
      state.selectedBookmark = bookmarkId;
    },
    pushFolder: (state, { payload: bookmarkData }) => {
      state.folderStack.push(bookmarkData);
    },
    replaceFolderStack: (state, { payload: newStack }) => {
      state.folderStack = newStack;
    },
    changeLayoutMode: (state, { payload: layoutMode }) => {
      state.layout.mode = layoutMode;
    },
    toggleExpandNode: (state, { payload: id }) => {
      const expandedNode = state.expandedTreeNodeIds;
      const indexInList = expandedNode.findIndex(
        (el) => String(el) === String(id)
      );

      if (indexInList === -1) {
        expandedNode.push(id);
      } else {
        expandedNode.splice(indexInList, 1);
      }
    },
  },
});

export const actions = {
  ...slice.actions,
  navigateTo: (id?: string | number) => (dispatch: Dispatch) => {
    const params: any = {};
    if (id) params["bookmarkid"] = id;
    const qs = QueryString.stringify(params);
    history.push(`/bookmark?${qs}`);
  },

  selectBookmark: (id?: string | number) => async (dispatch: Dispatch) => {
    const newFolderStack = [];

    let loopId = id;
    do {
      if (String(loopId) === "0") break;
      const bookmarkData = await AppController.bookmark.getBookmarkDetails(
        loopId ?? 0
      );
      newFolderStack.push(bookmarkData);
      loopId = bookmarkData.parentId;
    } while (loopId);

    newFolderStack.reverse();

    dispatch(slice.actions.replaceFolderStack(newFolderStack));
    dispatch(slice.actions.selectBookmark(id));
  },
};

export const selectors = {
  isOpen: ({ bookmark }: DefaultRootState) => bookmark.isOpen,
  selectedBookmark: ({ bookmark }: DefaultRootState) =>
    bookmark.selectedBookmark,
  folderStack: ({ bookmark }: DefaultRootState) => bookmark.folderStack,
  layoutMode: ({ bookmark }: DefaultRootState) => bookmark.layout.mode,
  expandedTreeNodeIds: ({ bookmark }: DefaultRootState) =>
    bookmark.expandedTreeNodeIds,
};

export default slice.reducer;
