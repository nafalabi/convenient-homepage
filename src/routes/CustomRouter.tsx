import React from "react";
import {
  HistoryRouterProps,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createHashHistory } from "history";

export const history = createHashHistory({ window });

type CustomRouterProps = Omit<HistoryRouterProps, "history">;

const CustomRouter = ({ children, basename }: CustomRouterProps) => {
  return (
    <HistoryRouter history={history} basename={basename}>
      {children}
    </HistoryRouter>
  );
};

export default CustomRouter;
