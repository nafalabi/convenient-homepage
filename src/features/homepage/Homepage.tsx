import { useSelector } from "react-redux";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import CustomSnackbarProvider from "components/NotifstackProvider";

import Background from "features/homepage/Background";
import FirstSetupScreen from "features/first-setup";
import SearchComponent from "features/search/SearchComponent";
import useSummonSearchComponent from "features/search/hooks/useSummonSearchComponent";
import useShortcut from "features/shortcut/useShortcut";
import DrawerTogglerButton from "features/drawer/DrawerTogglerButton";

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
            <DrawerTogglerButton />
            <SearchComponent />
            <Outlet />
          </>
        )}
      </CustomSnackbarProvider>
    </ThemeProvider>
  );
};

export default Homepage;
