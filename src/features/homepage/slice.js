import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "homepage",
  initialState: {
    isLoaded: false,
    imageURI: "",
  },
  reducers: {
    loadImage: (state, { payload }) => {
      state.imageURI = payload;
      state.isLoaded = true;
    },
  },
});

export const actions = {
  ...slice.actions,
};

export const selectors = {
  isLoaded: ({ homepage }) => homepage.isLoaded,
  imageURI: ({ homepage }) => homepage.imageURI,
};

export default slice.reducer;
