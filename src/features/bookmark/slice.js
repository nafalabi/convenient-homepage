import { createSlice } from "@reduxjs/toolkit";
import { getBookmarkDetails } from "./utils";

const initialState = {
  isOpen: true,
  selectedBookmark: 0,
  folderStack: [],
  layout: {
    mode: "list", // possible values - grid, list
  },
};

const slice = createSlice({
  initialState,
  name: "bookmark",
  reducers: {
    toggleBookmark: (state) => {
      state.isOpen = !state.isOpen;
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
  },
});

export const actions = {
  ...slice.actions,

  selectBookmark: (id) => async (dispatch) => {
    const newFolderStack = [];

    let loopId = id;
    do {
      if (String(loopId) === "0") break;
      const bookmarkData = await getBookmarkDetails(loopId);
      newFolderStack.push(bookmarkData);
      loopId = bookmarkData.parentId;
    } while (loopId);

    newFolderStack.reverse();

    dispatch(slice.actions.replaceFolderStack(newFolderStack));
    dispatch(slice.actions.selectBookmark(id));
  },
};

export const selectors = {
  isOpen: ({ bookmark }) => bookmark.isOpen,
  selectedBookmark: ({ bookmark }) => bookmark.selectedBookmark,
  folderStack: ({ bookmark }) => bookmark.folderStack,
  layoutMode: ({ bookmark }) => bookmark.layout.mode,
};

export default slice.reducer;
