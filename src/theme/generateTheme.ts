import { createTheme } from "@mui/material";

const generateTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

export default generateTheme;
