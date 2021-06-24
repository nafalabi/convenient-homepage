import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  selectedBookmark: 0,
};

const slice = createSlice({
  initialState,
  name: "bookmark",
  reducers: {
    toggleBookmark: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectBookmark: (state, { payload: BookmarkId }) => {
      state.selectedBookmark = BookmarkId;
    },
  },
});

export const actions = { ...slice.actions };

export const selectors = {
  isOpen: ({ bookmark }) => bookmark.isOpen,
  selectedBookmark: ({ bookmark }) => bookmark.selectedBookmark,
};

export default slice.reducer;
