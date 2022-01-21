import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
  },
});

export const actions = { ...slice.actions };

export default slice.reducer;
