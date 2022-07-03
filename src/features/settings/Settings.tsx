import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "components/PanelWithSidebar";
import SettingsMain from "./SettingsMain";
import SettingsSidebar from "./SettingsSidebar";
import { actions } from "./slice";
import useModalRouteAction from "hooks/useModalRouteAction";

const Settings = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(({ settings }) => settings.isOpen);

  const { handleClose } = useModalRouteAction({
    open: () => dispatch(actions.setOpen(true)),
    close: () => dispatch(actions.setOpen(false)),
  });

  return (
    <PanelWithSidebar
      open={isOpen}
      onClose={handleClose}
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
