import { HelpOutline, OpenInNew } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import * as CSS from "csstype";
import React from "react";

interface Props {
  children: JSX.Element | any;
  label?: string;
  labelWidth?: string;
  fixedLabelWidth?: boolean;
  mb?: number;
  helper?: string;
  justifyContent?: CSS.Property.JustifyContent;
  referenceLink?: string;
}

const InlineFormControl = ({
  children,
  label,
  labelWidth = "10rem",
  fixedLabelWidth = true,
  mb = 1,
  helper,
  justifyContent = "space-between",
  referenceLink,
}: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexGrow={1}
      mb={mb}
      justifyContent={justifyContent}
    >
      <Box
        display="inline-flex"
        flexBasis={fixedLabelWidth ? labelWidth : "auto"}
        alignItems="center"
        flexShrink={0}
        color="text.secondary"
        mr={1}
      >
        <Typography variant="body2">{label}</Typography>
        {helper && (
          <Box display="inline-flex" ml={1}>
            <Tooltip title={helper ?? ""}>
              <HelpOutline color="info" fontSize="small" />
            </Tooltip>
          </Box>
        )}
        {referenceLink && (
          <Box ml={1}>
            <IconButton href={referenceLink} target="_blank" size="small">
              <OpenInNew color="info" fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box display="inline-flex">{children}</Box>
    </Box>
  );
};

export default InlineFormControl;
