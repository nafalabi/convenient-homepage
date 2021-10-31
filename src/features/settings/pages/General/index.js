import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import UserDetails from "./UserDetail";

const General = () => {
  return (
    <Box>
      <Typography variant="h5">General Settings</Typography>
      <Box mt={1} mb={2}>
        <Divider />
      </Box>
      <UserDetails />
    </Box>
  );
};

export default General;
