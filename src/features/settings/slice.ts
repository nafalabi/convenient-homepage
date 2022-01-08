import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { generalSettingsDefault } from "app/storage/app-data/generalSettings";
import appData from "app/storage/app-data";
import { backgroundSettingsDefault } from "app/storage/app-data/backgroundSettings";
import { SettingsPage } from "./types";
import { noteSettingsDefault } from "app/storage/app-data/noteSettings";

export const slice = createSlice({
  name: "settings",
  initialState: {
    isOpen: false,
    page: SettingsPage.BACKGROUND,
    generalSettings: generalSettingsDefault,
    backgroundSettings: backgroundSettingsDefault,
    noteSettings: noteSettingsDefault,
  },
  reducers: {
    toggleSettings: (state) => {
      state.isOpen = !state.isOpen;
    },
    changePage: (state, { payload: page }: { payload: SettingsPage }) => {
      state.page = page;
    },
    storeGeneralSettings: (state, { payload }) => {
      state.generalSettings = payload;
    },
    storeBackgroundSettings: (state, { payload }) => {
      state.backgroundSettings = payload;
    },
    storeNoteSettings: (state, { payload }) => {
      state.noteSettings = payload;
    },
  },
});

export const actions = {
  ...slice.actions,
  fetchGeneralSettings: () => async (dispatch: Dispatch) => {
    const newValues = await appData.generalSettings();
    dispatch(slice.actions.storeGeneralSettings(newValues));
  },
  fetchBackgroundSettings: () => async (dispatch: Dispatch) => {
    const newValues = await appData.backgroundSettings();
    dispatch(slice.actions.storeBackgroundSettings(newValues));
  },
  fetchNoteSettings: () => async (dispatch: Dispatch) => {
    const newValues = await appData.noteSettings();
    dispatch(slice.actions.storeNoteSettings(newValues));
  },
};

export default slice.reducer;
