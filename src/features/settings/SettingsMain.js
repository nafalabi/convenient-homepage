import React from "react";
import { useSelector } from "react-redux";
import { PAGE_BACKGROUND, PAGE_GENERAL, selectors } from "./slice";
import Background from "./pages/Background";
import General from "./pages/General";

const SettingsMain = () => {
  const page = useSelector(selectors.page);

  return (
    <>
      {page === PAGE_BACKGROUND && <Background />}
      {page === PAGE_GENERAL && <General />}
    </>
  );
};

export default SettingsMain;
