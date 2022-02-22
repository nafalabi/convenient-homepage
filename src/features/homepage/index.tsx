import { useSelector } from "react-redux";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";

import CustomSnackbarProvider from "components/NotifstackProvider";

import Background from "features/homepage/Background";
import Drawer from "features/drawer/Drawer";
import Note from "features/note/Note";
import Bookmark from "features/bookmark/Bookmark";
import Settings from "features/settings/Settings";
import FirstSetupScreen from "features/first-setup";
import SearchComponent from "features/search/SearchComponent";
import useSummonSearchComponent from "features/search/hooks/useSummonSearchComponent";
import useShortcut from "features/shortcut/useShortcut";

const generateTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

const Homepage = () => {
  const alreadySetup = useSelector(({ homepage }) => homepage.alreadySetup);
  const darkMode = useSelector(
    ({ settings }) => settings.generalSettings.darkMode
  );

  useSummonSearchComponent();
  useShortcut();

  return (
    <ThemeProvider theme={generateTheme(darkMode)}>
      <CustomSnackbarProvider>
        <CssBaseline />
        <Background alreadySetup={alreadySetup} />
        {!alreadySetup ? (
          <FirstSetupScreen />
        ) : (
          <>
            <Drawer />
            <Note />
            <Bookmark />
            <Settings />
            <SearchComponent />
          </>
        )}
      </CustomSnackbarProvider>
    </ThemeProvider>
  );
};

export default Homepage;
