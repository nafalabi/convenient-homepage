import React from "react";
import store from "./app/store";
import { ImageAPI } from "./API";
import { actions as homepageActions } from "./features/homepage/slice";
import Homepage from "./features/homepage/Homepage";
import Sidebar from "./features/sidebar/Sidebar";
import Todo from "./features/todo/Todo";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core";

ImageAPI.getImageBase64().then((imageURI) => {
  store.dispatch(homepageActions.loadImage(imageURI));
});

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Homepage />
        <Sidebar />
        <Todo />
      </ThemeProvider>
    </>
  );
}

export default App;
