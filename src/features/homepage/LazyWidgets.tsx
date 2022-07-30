import React, { useMemo, useState } from "react";
import LazyComponent from "components/LazyComponent";
import { styled } from "@mui/material";
const Clock = React.lazy(() => import("./widgets/Clock/Clock"));
const Greeting = React.lazy(() => import("./widgets/Greeting/Greeeting"));
const QuickLinks = React.lazy(() => import("./widgets/QuickLinks/QuickLinks"));
const SearchField = React.lazy(
  () => import("./widgets/SearchField/SearchField")
);

enum Widgets {
  CLOCK,
  GREETINGS,
  SEARCH_FIELD,
  QUICKLINKS,
}

const initialLoadedValue = {
  [Widgets.CLOCK]: false,
  [Widgets.GREETINGS]: false,
  [Widgets.SEARCH_FIELD]: false,
  [Widgets.QUICKLINKS]: false,
};

const RootComp = styled("div")({
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  width: "80vw",
  userSelect: "none",
  transition: "opacity 0.5s ease 0.3s",
});

export interface LazyWidgetsProps {
  imageIsLoaded: boolean;
}

const LazyWidgets = ({ imageIsLoaded }: LazyWidgetsProps) => {
  const [loadedWidgets, setLoadedWidgets] = useState(initialLoadedValue);

  const showComponents = useMemo(() => {
    const indexOfUnloadedWidget = Object.values(loadedWidgets).findIndex(
      (val) => val === false
    );
    return indexOfUnloadedWidget === -1 && imageIsLoaded;
  }, [loadedWidgets, imageIsLoaded]);

  const handleOnLoaded = (widget: Widgets) => () =>
    setLoadedWidgets((old) => ({ ...old, [widget]: true }));

  return (
    <RootComp
      sx={{
        opacity: Number(showComponents),
      }}
    >
      <LazyComponent
        Component={Clock}
        onComplete={handleOnLoaded(Widgets.CLOCK)}
      />
      <LazyComponent
        Component={Greeting}
        onComplete={handleOnLoaded(Widgets.GREETINGS)}
      />
      <LazyComponent
        Component={SearchField}
        onComplete={handleOnLoaded(Widgets.SEARCH_FIELD)}
      />
      <LazyComponent
        Component={QuickLinks}
        onCompleteLoading={handleOnLoaded(Widgets.QUICKLINKS)}
      />
    </RootComp>
  );
};

export default LazyWidgets;
