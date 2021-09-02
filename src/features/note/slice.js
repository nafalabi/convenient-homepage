import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  selectedNote: 0,
  treeListRefreshRef: 0,
};

const slice = createSlice({
  initialState,
  name: "note",
  reducers: {
    toggleNote: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectNote: (state, { payload: noteId }) => {
      state.selectedNote = noteId;
    },
    refreshTreeList: (state) => {
      state.treeListRefreshRef = Math.random();
    },
  },
});

export const actions = { ...slice.actions };

export const selectors = {
  isOpen: ({ note }) => note.isOpen,
  selectedNote: ({ note }) => note.selectedNote,
  treeListRefreshRef: ({ note }) => note.treeListRefreshRef,
};

export default slice.reducer;
