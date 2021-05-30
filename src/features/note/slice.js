import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  selectedNote: 0,
  treeListRefreshRef: 0,
  noteIdOfOpenedActionMenu: 0,
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
    openNoteListActionMenu: (state, { payload: noteid }) => {
      state.noteIdOfOpenedActionMenu = noteid;
    },
    closeNoteListActionMenu: (state) => {
      state.noteIdOfOpenedActionMenu = 0;
    },
  },
});

export const actions = { ...slice.actions };

export const selectors = {
  isOpen: ({ note }) => note.isOpen,
  selectedNote: ({ note }) => note.selectedNote,
  treeListRefreshRef: ({ note }) => note.treeListRefreshRef,
  noteIdOfOpenedActionMenu: ({ note }) => note.noteIdOfOpenedActionMenu,
};

export default slice.reducer;
