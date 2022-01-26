import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import db from "app/storage/dexie/db";
import Note from "app/storage/dexie/Note";
import { actions as settingsActions } from "features/settings/slice";
import store from "app/storage/redux/store";

export const NOTE_HOME = 0;

const initialState = {
  isOpen: false,
  selectedNote: NOTE_HOME,
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
    replaceNoteStack: (state, { payload: newStack }) => {
      state.noteStack = newStack;
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
  toggleEditable: () => (dispatch: Dispatch) => {
    const state = store.getState();
    const noteSettings = Object.assign({}, state.settings.noteSettings);
    noteSettings.editable = !noteSettings.editable;
    store.dispatch(settingsActions.storeNoteSettings(noteSettings));
  },
};

export const selectors = {
  isOpen: ({ note }: DefaultRootState) => note.isOpen,
  selectedNote: ({ note }: DefaultRootState) => note.selectedNote,
  noteStack: ({ note }: DefaultRootState) => note.noteStack as Note[],
  editable: ({ settings }: DefaultRootState) => settings.noteSettings.editable,
};

export default slice.reducer;
