import { createSlice } from "@reduxjs/toolkit";
import LocalData from "../local-data";

const initialState = { alreadySetup: false, darkMode: false };

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    init: (state) => {
      state.alreadySetup = LocalData.alreadyFirstSetup();
      state.darkMode = LocalData.darkMode();
    },
    setAlreadySetup: (state) => {
      state.alreadySetup = true;
    },
  },
});

export const actions = {
  ...globalSlice.actions,
};

export default globalSlice.reducer;
