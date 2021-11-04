import { Box, Typography } from "@mui/material";
import React from "react";

const InlineFormControl = ({ children, label, labelWidth, mb }) => {
  return (
    <Box display="flex" alignItems="center" flexGrow={1} mb={mb || 1}>
      <Box
        flexBasis={labelWidth || "10rem"}
        flexShrink={0}
        color="text.secondary"
      >
        <Typography variant="body2">{label}</Typography>
      </Box>
      {children}
    </Box>
  );
};

export default InlineFormControl;
