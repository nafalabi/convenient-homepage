import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import SettingsMain from "./SettingsMain";
import SettingsSidebar from "./SettingsSidebar";
import { actions } from "./slice";

const Settings = () => {
  const isOpen = useSelector(({ settings }) => settings.isOpen);
  const dispatch = useDispatch();

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleSettings())}
      title="Settings"
      SidebarComponent={({ dialogRef }) => (
        <SettingsSidebar dialogRef={dialogRef} />
      )}
      ContentComponent={({ dialogRef }) => (
        <SettingsMain dialogRef={dialogRef} />
      )}
    />
  );
};

export default Settings;
