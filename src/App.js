import React from "react";
import store from "./app/store";
import ImageAPI from "./API/ImageAPI";
import { actions as homepageActions } from "./features/homepage/slice";
import Homepage from "./features/homepage/Homepage";
import Sidebar from "./features/sidebar/Sidebar";
import Todo from "./features/todo/Todo";
import Note from "./features/note/Note";
import Settings from "./features/settings/Settings";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core";
import Bookmark from "./features/bookmark/Bookmark";
import CustomSnackbarProvider from "./components/CustomSnackbarProvider";

ImageAPI.getActiveBackground().then((imageURI) => {
  store.dispatch(homepageActions.loadImage(imageURI));
});

const theme = unstable_createMuiStrictModeTheme({
  typography: { button: { textTransform: "none" } },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomSnackbarProvider>
          <CssBaseline />
          <Homepage />
          <Sidebar />
          <Todo />
          <Note />
          <Bookmark />
          <Settings />
        </CustomSnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
