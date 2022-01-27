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
  handleOpenChromeApps: () => {
    chrome.tabs.update({
      url: "chrome://apps/",
    });
  },
  handleOpenOriginalHomepage: () => {
    chrome.tabs.update({
      url: "chrome-search://local-ntp/local-ntp.html",
    });
  },
};

export default slice.reducer;
