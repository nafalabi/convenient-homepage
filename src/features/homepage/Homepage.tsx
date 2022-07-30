import { useSelector } from "react-redux";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import CustomSnackbarProvider from "components/NotifstackProvider";

import Background from "features/homepage/Background";
import FirstSetupScreen from "features/first-setup";
import useSummonSearchComponent from "features/search/hooks/useSummonSearchComponent";
import useShortcut from "features/shortcut/useShortcut";

const generateTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

const Homepage = () => {
  const { alreadySetup, darkMode } = useSelector(({ homepage, settings }) => ({
    alreadySetup: homepage.alreadySetup,
    darkMode: homepage.alreadySetup ? settings.generalSettings.darkMode : false,
  }));

  useSummonSearchComponent();
  useShortcut();

  return (
    <ThemeProvider theme={generateTheme(darkMode)}>
      <CustomSnackbarProvider>
        <CssBaseline />
        <Background alreadySetup={alreadySetup} />
        {!alreadySetup ? <FirstSetupScreen /> : <Outlet />}
      </CustomSnackbarProvider>
    </ThemeProvider>
  );
};

export default Homepage;
