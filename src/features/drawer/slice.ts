import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const actions = {
  ...slice.actions,
};


export default slice.reducer;
