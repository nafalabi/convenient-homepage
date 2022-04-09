import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import db from "app/db";
import { actions as settingsActions } from "features/settings/slice";
import { AppThunks } from "app/redux/store";
import {
  setPreventWindowUnload,
  unsetPreventWindowUnload,
} from "app/utils/preventWindowUnload";

export const NOTE_HOME = 0;

export interface NoteStackItem {
  noteid: number;
  notename: string;
}

const initialState = {
  isOpen: false,
  selectedNoteId: NOTE_HOME,
  noteStack: [] as NoteStackItem[],

  isModified: false,
  isSaving: false,
};

const slice = createSlice({
  initialState,
  name: "note",
  reducers: {
    toggleNote: (state) => {
      state.isOpen = !state.isOpen;
    },

    selectNote: (state, { payload: noteId }: PayloadAction<number>) => {
      state.selectedNoteId = noteId;
    },

    replaceNoteStack: (
      state,
      { payload: newStack }: PayloadAction<NoteStackItem[]>
    ) => {
      state.noteStack = newStack;
    },

    setIsModified: (state, { payload }: PayloadAction<boolean>) => {
      state.isModified = payload;
    },

    setIsSaving: (state, { payload }: PayloadAction<boolean>) => {
      state.isSaving = payload;
    },
  },
});

export const actions = {
  ...slice.actions,

  selectNote:
    (noteId?: number): AppThunks =>
    (dispatch, getState) => {
      if (!noteId) return;

      const {
        note: { isModified },
      } = getState();

      if (isModified) {
        const isConfirmed = window.confirm(
          "Changes on the current note is still not saved, are you sure want to discard it?"
        );

        if (!isConfirmed) return;
        dispatch(slice.actions.setIsModified(false));
      }

      dispatch(slice.actions.selectNote(noteId));

      // Processing Breadcrumb
      (async () => {
        const newNoteStack: NoteStackItem[] = [];

        let loopId = noteId;

        while (loopId) {
          const noteData = await db.note.where({ noteid: loopId }).first();
          if (!noteData) break;
          newNoteStack.push({
            noteid: noteData.noteid as number,
            notename: noteData.notename as string,
          });
          loopId = noteData.parentnoteid as number;
        }

        newNoteStack.reverse();

        dispatch(slice.actions.replaceNoteStack(newNoteStack));
      })();
    },

  setIsModified:
    (newValue: boolean): AppThunks =>
    (dispatch) => {
      newValue === true ? setPreventWindowUnload() : unsetPreventWindowUnload();

      dispatch(slice.actions.setIsModified(newValue));
    },

  toggleEditable:
    () => (dispatch: Dispatch, getState: () => DefaultRootState) => {
      const state = getState();
      const noteSettings = Object.assign({}, state.settings.noteSettings);
      noteSettings.editable = !noteSettings.editable;
      settingsActions.storeNoteSettings(noteSettings)(dispatch);
    },
};

export const selectors = {
  isOpen: ({ note }: DefaultRootState) => note.isOpen,
  selectedNote: ({ note }: DefaultRootState) => note.selectedNoteId,
  noteStack: ({ note }: DefaultRootState) => note.noteStack,
  editable: ({ settings }: DefaultRootState) => settings.noteSettings.editable,
};

export default slice.reducer;
