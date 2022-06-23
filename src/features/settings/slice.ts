import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { SettingsPage } from "./types";
import appData from "app/storage/app-data";
import {
  generalSettingsDefault,
  IGeneralSettings,
} from "app/storage/app-data/generalSettings";
import {
  backgroundSettingsDefault,
  IBackgroundSettings,
} from "app/storage/app-data/backgroundSettings";
import {
  INoteSettings,
  noteSettingsDefault,
} from "app/storage/app-data/noteSettings";
import { IShortcuts, shortcutDefault } from "app/storage/app-data/shortcuts";

export const slice = createSlice({
  name: "settings",
  initialState: {
    // isOpen: false,
    // page: SettingsPage.BACKGROUND,
    isOpen: true,
    page: SettingsPage.DATABASE,
    generalSettings: generalSettingsDefault,
    backgroundSettings: backgroundSettingsDefault,
    noteSettings: noteSettingsDefault,
    shortcuts: shortcutDefault,
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
    storeShortcuts: (state, { payload }) => {
      state.shortcuts = payload;
    },
  },
});

export const actions = {
  ...slice.actions,
  init: () => async (dispatch: Dispatch) => {
    const generalSettings = await appData.generalSettings();
    const backgroundSettings = await appData.backgroundSettings();
    const noteSettings = await appData.noteSettings();
    dispatch(slice.actions.storeGeneralSettings(generalSettings));
    dispatch(slice.actions.storeBackgroundSettings(backgroundSettings));
    dispatch(slice.actions.storeNoteSettings(noteSettings));
  },
  storeGeneralSettings:
    (newValues: IGeneralSettings) => async (dispatch: Dispatch) => {
      await appData.generalSettings(newValues);
      dispatch(slice.actions.storeGeneralSettings(newValues));
    },
  storeBackgroundSettings:
    (newValues: IBackgroundSettings) => async (dispatch: Dispatch) => {
      await appData.backgroundSettings(newValues);
      dispatch(slice.actions.storeBackgroundSettings(newValues));
    },
  storeNoteSettings:
    (newValues: INoteSettings) => async (dispatch: Dispatch) => {
      await appData.noteSettings(newValues);
      dispatch(slice.actions.storeNoteSettings(newValues));
    },
  storeShortcuts: (newValues: IShortcuts) => async (dispatch: Dispatch) => {
    await appData.shortcuts(newValues);
    dispatch(slice.actions.storeShortcuts(newValues));
  },
  setUserName: (username: string) => async (dispatch: Dispatch) => {
    const generalSettingData = await appData.generalSettings();
    generalSettingData.name = username;
    appData.generalSettings(generalSettingData);
  },
};

export default slice.reducer;
