import ReactDOM from "react-dom";
import store from "./app/storage/redux/store";
import { Provider } from "react-redux";
import React, { useState } from "react";
import Homepage from "./features/homepage/Homepage";
import Drawer from "./features/drawer/Drawer";
import Note from "./features/note/Note";
import Settings from "./features/settings/Settings";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material";
import Bookmark from "./features/bookmark/Bookmark";
import CustomSnackbarProvider from "./components/NotifstackProvider";
import localData from "./app/storage/local-data";
import FirstSetupScreen from "./features/first-setup";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [alreadySetup, setSetupStatus] = useState<boolean>(
    localData.alreadyFirstSetup()
  );

  return (
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CustomSnackbarProvider>
              <CssBaseline />
              <Homepage alreadySetup={alreadySetup} />
              {!alreadySetup && (
                <FirstSetupScreen onSetup={() => setSetupStatus(true)} />
              )}
              {alreadySetup && (
                <>
                  <Drawer />
                  <Note />
                  <Bookmark />
                  <Settings />
                </>
              )}
            </CustomSnackbarProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
