import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../../../features/homepage/slice";
import sidebarReducer from "../../../features/sidebar/slice";
import todoReducer from "../../../features/todo/slice";
import noteReducer from "../../../features/note/slice";
import bookmarkReducer from "../../../features/bookmark/slice";
import settingsReducer from "../../../features/settings/slice";

export default configureStore({
  reducer: {
    homepage: homepageReducer,
    sidebar: sidebarReducer,
    todo: todoReducer,
    note: noteReducer,
    bookmark: bookmarkReducer,
    settings: settingsReducer,
  },
});
