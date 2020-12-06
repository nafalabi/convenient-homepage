import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepage/slice";
import sidebarReducer from "../features/sidebar/slice";
import todoReducer from "../features/todo/slice";

export default configureStore({
  reducer: {
    homepage: homepageReducer,
    sidebar: sidebarReducer,
    todo: todoReducer,
  },
});
