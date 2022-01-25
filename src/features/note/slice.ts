import { createSlice, Dispatch } from "@reduxjs/toolkit";
import db from "app/storage/dexie/db";
import Note from "app/storage/dexie/Note";
import { DefaultRootState } from "react-redux";

export const NOTE_HOME = 0;

const initialState = {
  isOpen: false,
  selectedNote: NOTE_HOME,
  noteStack: [], // for breadcrumb
  editable: true,
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
    replaceNoteStack: (state, { payload: newStack }) => {
      state.noteStack = newStack;
    },
    toggleEditable: (state) => {
      state.editable = !state.editable;
    },
  },
});

export const actions = {
  ...slice.actions,
  selectNote: (noteId?: number) => (dispatch: Dispatch) => {
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
  isOpen: ({ note }: DefaultRootState) => note.isOpen,
  selectedNote: ({ note }: DefaultRootState) => note.selectedNote,
  noteStack: ({ note }: DefaultRootState) => note.noteStack as Note[],
  editable: ({ note }: DefaultRootState) => note.editable,
};

export default slice.reducer;
