import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "components/PanelWithSidebar";
import SettingsMain from "./SettingsMain";
import SettingsSidebar from "./SettingsSidebar";
import { actions } from "./slice";

const Settings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.init());
  }, [dispatch]);

  const isOpen = useSelector(({ settings }) => settings.isOpen);

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
