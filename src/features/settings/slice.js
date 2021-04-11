import { createSlice } from "@reduxjs/toolkit";

export const PAGE_GENERAL = 0;
export const PAGE_BACKGROUND = 1;

export const slice = createSlice({
  name: "settings",
  initialState: {
    isOpen: false,
    page: PAGE_BACKGROUND,
  },
  reducers: {
    toggleSettings: (state) => {
      state.isOpen = !state.isOpen;
    },
    changePage: (state, { payload: page }) => {
      state.page = page;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export const selectors = {
  isOpen: ({ settings }) => settings.isOpen,
  page: ({ settings }) => settings.page,
};

export default slice.reducer;
