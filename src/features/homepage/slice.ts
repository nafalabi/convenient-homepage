import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import appData from "app/storage/app-data";

export const slice = createSlice({
  name: "homepage",
  initialState: {
    initialized: false,
    username: "",
  },
  reducers: {
    initialize: (state, { payload: { username } }) => {
      state.initialized = true;
      state.username = username;
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
