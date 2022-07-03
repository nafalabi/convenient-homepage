import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
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
