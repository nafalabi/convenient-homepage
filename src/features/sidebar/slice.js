import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export const selectors = {
  isOpen: ({ sidebar }) => sidebar.isOpen,
};

export default slice.reducer;
