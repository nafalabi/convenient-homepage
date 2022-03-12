import ReactDOM from "react-dom";
import store from "./app/redux/store";
import { Provider } from "react-redux";
import React from "react";
import Homepage from "./features/homepage";
import { StyledEngineProvider } from "@mui/material";

import "@fontsource/montserrat";
import "@fontsource/roboto";
import "@fontsource/material-icons";
import "@fontsource/material-icons-outlined";
import "@fontsource/material-icons-rounded";
import "@fontsource/material-icons-sharp";
import "@fontsource/material-icons-two-tone";

import exposeGlobalVars from "exposeGlobalVars";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <Homepage />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

exposeGlobalVars();
