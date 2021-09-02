import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../app/storage/Dexie";

const initialState = {
  isOpen: true,
  selectedNote: 0,
  treeListRefreshRef: 0,
  noteStack: [], // for breadcrumb
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
    replaceNoteStack: (state, { payload: newStack }) => {
      state.noteStack = newStack;
    },
  },
});

export const actions = {
  ...slice.actions,
  selectNote: (noteId) => (dispatch) => {
    dispatch(slice.actions.selectNote(noteId));

    // Processing Breadcrumb
    (async () => {
      const newNoteStack = [];

      let loopId = noteId;

      while (loopId) {
        const noteData = await db.note.where({ noteid: loopId }).first();
        if (!noteData) break;
        newNoteStack.push({
          noteid: noteData.noteid,
          notename: noteData.notename,
        });
        loopId = noteData.parentnoteid;
      }

      newNoteStack.reverse();

      dispatch(slice.actions.replaceNoteStack(newNoteStack));
    })();
  },
};

export const selectors = {
  isOpen: ({ note }) => note.isOpen,
  selectedNote: ({ note }) => note.selectedNote,
  treeListRefreshRef: ({ note }) => note.treeListRefreshRef,
  noteStack: ({ note }) => note.noteStack,
};

export default slice.reducer;
