import { Box, Typography } from "@mui/material";
import React from "react";

const InlineFormControl = (props: {
  children: JSX.Element;
  label?: string;
  labelWidth?: string;
  mb?: number;
}) => {
  return (
    <Box display="flex" alignItems="center" flexGrow={1} mb={props.mb || 1}>
      <Box
        flexBasis={props.labelWidth || "10rem"}
        flexShrink={0}
        color="text.secondary"
      >
        <Typography variant="body2">{props.label}</Typography>
      </Box>
      {props.children}
    </Box>
  );
};

export default InlineFormControl;
