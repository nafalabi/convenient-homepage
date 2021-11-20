import React, { useState } from "react";
import Homepage from "./features/homepage/Homepage";
import Sidebar from "./features/sidebar/Sidebar";
import Todo from "./features/todo/Todo";
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

// const theme = createTheme({
//   typography: { button: { textTransform: "none" } },
// });

const theme = createTheme();

function App() {
  const [alreadySetup, setSetupStatus] = useState<boolean>(
    localData.alreadyFirstSetup()
  );

  return (
    <>
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
                <Sidebar />
                <Todo />
                <Note />
                <Bookmark />
                <Settings />
              </>
            )}
          </CustomSnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
