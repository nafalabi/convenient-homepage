import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import DialogController from "./dialogs/DialogController";
import { DialogProvider } from "./hooks/useDialog";
import ImageProvider from "./ImageProvider";
import Library from "./Library";

const Background = () => {
  return (
    <DialogProvider>
      <Box>
        <Typography variant="h5">Background Settings</Typography>
        <Box mt={1} mb={2}>
          <Divider />
        </Box>

        <ImageProvider />
        <Library />

        <DialogController />
      </Box>
    </DialogProvider>
  );
};

export default Background;
