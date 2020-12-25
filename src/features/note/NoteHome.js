import { Box, Typography } from "@material-ui/core";
import React from "react";

const NoteHome = () => {
  return (
    <Box maxWidth="600px">
      <Typography variant="h4">Welcome</Typography>
      <Typography variant="subtitle1">This is the homepage of Note</Typography>
      <Typography variant="body2"></Typography>
    </Box>
  );
};

export default NoteHome;
