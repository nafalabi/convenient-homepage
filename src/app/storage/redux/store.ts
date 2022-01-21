import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "features/homepage/slice";
import drawerReducer from "features/drawer/slice";
import noteReducer from "features/note/slice";
import bookmarkReducer from "features/bookmark/slice";
import settingsReducer from "features/settings/slice";
import searchReducer from "features/search/slice";

const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    drawer: drawerReducer,
    note: noteReducer,
    bookmark: bookmarkReducer,
    settings: settingsReducer,
    search: searchReducer,
  },
});

export default store;

// Type definitions

export type RootState = ReturnType<typeof store.getState>;

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
