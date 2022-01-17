import ReactDOM from "react-dom";
import store from "./app/storage/redux/store";
import { Provider } from "react-redux";
import React from "react";
import Homepage from "./features/homepage";
import { StyledEngineProvider } from "@mui/material";

import "@fontsource/montserrat";
import "@fontsource/roboto";

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
