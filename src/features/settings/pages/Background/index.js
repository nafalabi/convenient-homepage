import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import ImageProvider from "./ImageProvider";
import Library from "./Library";

const Background = () => {
  return (
    <Box>
      <Typography variant="h5">Background Settings</Typography>
      <Box mt={1} mb={2}>
        <Divider />
      </Box>

      <ImageProvider />
      <Library />
    </Box>
  );
};

export default Background;
