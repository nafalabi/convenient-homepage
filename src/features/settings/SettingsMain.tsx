import React, { RefObject } from "react";
import { useSelector } from "react-redux";
import { PAGE_BACKGROUND, PAGE_GENERAL } from "./slice";
import Background from "./pages/Background/index";
import General from "./pages/General/index";

export interface SettingsMainProps {
  dialogRef: RefObject<HTMLDivElement>;
}

const SettingsMain = (props: { dialogRef: RefObject<HTMLDivElement> }) => {
  const page = useSelector(({ settings }) => settings.page);

  return (
    <>
      {page === PAGE_BACKGROUND && <Background />}
      {page === PAGE_GENERAL && <General />}
    </>
  );
};

export default SettingsMain;
