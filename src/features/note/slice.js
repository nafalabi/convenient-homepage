import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  selectedNote: 0,
  treeListRefreshReference: 0,
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
      state.treeListRefreshReference = Math.random();
    },
  },
});

export const actions = { ...slice.actions };

export const selectors = {
  isOpen: ({ note }) => note.isOpen,
  selectedNote: ({ note }) => note.selectedNote,
  treeListRefreshReference: ({ note }) => note.treeListRefreshReference,
};

export default slice.reducer;
