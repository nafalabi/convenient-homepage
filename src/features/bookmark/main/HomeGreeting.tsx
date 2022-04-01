import { Box, Typography } from "@mui/material";
import React from "react";

const HomeGreeting = () => {
  return (
    <>
      <Typography variant="h4">Welcome</Typography>
      <Box maxWidth="300px" lineHeight="1.5" mb={3}>
        <Typography variant="subtitle1">
          This is the homepage of Bookmarks
        </Typography>
        <Typography variant="body2">
          Please select one of the folders below
        </Typography>
      </Box>
    </>
  );
};

export default HomeGreeting;
