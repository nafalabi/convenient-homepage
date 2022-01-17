import ReactDOM from "react-dom";
import store from "./app/storage/redux/store";
import { Provider, useSelector } from "react-redux";
import React, { useState } from "react";
import Homepage from "./features/homepage/Homepage";
import Drawer from "./features/drawer/Drawer";
import Note from "./features/note/Note";
import Bookmark from "./features/bookmark/Bookmark";
import Settings from "./features/settings/Settings";
import FirstSetupScreen from "./features/first-setup";
// import SearchComponent from "features/search";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import CustomSnackbarProvider from "./components/NotifstackProvider";

import "@fontsource/montserrat";
import "@fontsource/roboto";
import { actions } from "app/storage/redux/globalSlice";

const generateTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

store.dispatch(actions.init());

function App() {
  const alreadySetup = useSelector(({ global }) => global.alreadySetup);
  const darkMode = useSelector(({ global }) => global.darkMode);

  return (
    <ThemeProvider theme={generateTheme(darkMode)}>
      <CustomSnackbarProvider>
        <CssBaseline />
        <Homepage alreadySetup={alreadySetup} />
        {!alreadySetup && <FirstSetupScreen />}
        {alreadySetup && (
          <>
            <Drawer />
            <Note />
            <Bookmark />
            <Settings />
            {/* <SearchComponent /> */}
          </>
        )}
      </CustomSnackbarProvider>
    </ThemeProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
