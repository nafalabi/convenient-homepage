import { HelpOutline } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

const InlineFormControl = (props: {
  children: JSX.Element;
  label?: string;
  labelWidth?: string;
  mb?: number;
  helper?: string;
}) => {
  return (
    <Box display="flex" alignItems="center" flexGrow={1} mb={props.mb || 1}>
      <Box
        display="inline-flex"
        flexBasis={props.labelWidth || "10rem"}
        flexShrink={0}
        color="text.secondary"
        mr="5px"
      >
        <Typography variant="body2">{props.label}</Typography>
        {props.helper && (
          <>
            <Tooltip title={props.helper ?? ""}>
              <HelpOutline color="info" fontSize="small" />
            </Tooltip>
          </>
        )}
      </Box>
      {props.children}
    </Box>
  );
};

export default InlineFormControl;
