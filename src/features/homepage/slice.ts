import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import appData from "app/storage/app-data";
import LocalData from "app/storage/local-data";

const initialState = {
  initialized: false,
  username: "",
  alreadySetup: LocalData.alreadyFirstSetup(),
};

export const slice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    initialize: (state, { payload: { username } }) => {
      state.initialized = true;
      state.username = username;
    },
    setAlreadySetup: (state) => {
      state.alreadySetup = true;
      LocalData.alreadyFirstSetup(true);
    },
  },
});

export const actions = {
  ...slice.actions,
  initialize: () => async (dispatch: Dispatch) => {
    const generalSettings = await appData.generalSettings();

    dispatch(slice.actions.initialize({ username: generalSettings.name }));
  },
};

export default slice.reducer;
