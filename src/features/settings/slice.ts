import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { generalSettingsDefault } from "../../app/storage/app-data/generalSettings";
import appData from "../../app/storage/app-data";
import { backgroundSettingsDefault } from "../../app/storage/app-data/backgroundSettings";

export const PAGE_GENERAL = 0;
export const PAGE_BACKGROUND = 1;

export const slice = createSlice({
  name: "settings",
  initialState: {
    isOpen: false,
    page: PAGE_BACKGROUND,
    generalSettings: generalSettingsDefault,
    backgroundSettings: backgroundSettingsDefault,
  },
  reducers: {
    toggleSettings: (state) => {
      state.isOpen = !state.isOpen;
    },
    changePage: (state, { payload: page }) => {
      state.page = page;
    },
    storeGeneralSettings: (state, { payload }) => {
      state.generalSettings = payload;
    },
    storeBackgroundSettings: (state, { payload }) => {
      state.backgroundSettings = payload;
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
};

export default slice.reducer;
