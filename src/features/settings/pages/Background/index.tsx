import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DialogController from "./dialogs/DialogController";
import { DialogProvider } from "./hooks/useDialog";
import ProviderSetting from "./ProviderSetting";
import Library from "./Library";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";

const Background = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBackgroundSettings());
  }, [dispatch]);

  return (
    <DialogProvider>
      <Box>
        <Typography variant="h5">Background Settings</Typography>
        <Box mt={1} mb={2}>
          <Divider />
        </Box>

        <ProviderSetting />
        <Library />

        <DialogController />
      </Box>
    </DialogProvider>
  );
};

export default Background;
