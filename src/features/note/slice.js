import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedNote: 0,
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
  },
});

export const actions = { ...slice.actions };

export const selectors = {
  isOpen: ({ note }) => note.isOpen,
  selectedNote: ({ note }) => note.selectedNote,
};

export default slice.reducer;
