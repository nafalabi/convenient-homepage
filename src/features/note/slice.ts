import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";
import db from "app/db";
import { actions as settingsActions } from "features/settings/slice";
import { AppThunk } from "app/redux/store";
import {
  setPreventWindowUnload,
  unsetPreventWindowUnload,
} from "app/utils/preventWindowUnload";
import QueryString from "app/utils/querystring";
import { history } from "routes/CustomRouter";

export const HOME_NOTE = -1;

export interface NoteStackItem {
  noteid: number;
  notename: string;
}

const initialState = {
  isOpen: false,
  selectedNoteId: HOME_NOTE,
  noteStack: [] as NoteStackItem[],

  isUnsaved: false,
  isSaving: false,
};

const slice = createSlice({
  initialState,
  name: "note",
  reducers: {
    setOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
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

    setIsUnsaved: (state, { payload }: PayloadAction<boolean>) => {
      state.isUnsaved = payload;
    },

    setIsSaving: (state, { payload }: PayloadAction<boolean>) => {
      state.isSaving = payload;
    },
  },
});

export const actions = {
  ...slice.actions,

  setOpen:
    (value: boolean): AppThunk<boolean | undefined> =>
    (dispatch) => {
      const shouldProceed = dispatch(actions.checkShouldProceedWhenUnsaved());
      const preventProceed = !shouldProceed;

      if (preventProceed) return preventProceed;

      dispatch(slice.actions.setOpen(value));
    },

  navigateTo:
    (noteid?: number): AppThunk =>
    (dispatch) => {
      const shouldProceed = dispatch(actions.checkShouldProceedWhenUnsaved());
      if (!shouldProceed) return;

      const param: any = {};
      if (noteid) param["noteid"] = noteid;
      const qs = QueryString.stringify(param);
      history.push(`/note?${qs}`);
    },

  selectNote:
    (noteId?: number): AppThunk =>
    (dispatch) => {
      if (!noteId) return;

      const shouldProceed = dispatch(actions.checkShouldProceedWhenUnsaved());
      if (!shouldProceed) return;

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

  checkShouldProceedWhenUnsaved:
    (): AppThunk<boolean> => (dispatch, getState) => {
      const {
        note: { isUnsaved },
      } = getState();

      if (isUnsaved) {
        const isConfirmed = window.confirm(
          "Changes on the current note is still not saved, are you sure want to discard it?"
        );

        if (!isConfirmed) return false;

        dispatch(slice.actions.setIsUnsaved(false));
      }

      return true;
    },

  setIsUnsaved:
    (newValue: boolean): AppThunk =>
    (dispatch) => {
      newValue === true ? setPreventWindowUnload() : unsetPreventWindowUnload();

      dispatch(slice.actions.setIsUnsaved(newValue));
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
