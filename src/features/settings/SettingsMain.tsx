import React, { RefObject } from "react";
import { useSelector } from "react-redux";
import Background from "./pages/Background/index";
import General from "./pages/General/index";
import NoteSettingsPage from "./pages/Note";
import { SettingsPage } from "./types";

export interface SettingsMainProps {
  dialogRef: RefObject<HTMLDivElement>;
}

const SettingsMain = (props: { dialogRef: RefObject<HTMLDivElement> }) => {
  const page = useSelector(({ settings }) => settings.page);

  return (
    <>
      {page === SettingsPage.BACKGROUND && <Background />}
      {page === SettingsPage.GENERAL && <General />}
      {page === SettingsPage.NOTE && <NoteSettingsPage />}
    </>
  );
};

export default SettingsMain;
