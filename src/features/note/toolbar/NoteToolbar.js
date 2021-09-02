import React from "react";
import { Box } from "@material-ui/core";
import NoteBreadcrumb from "./NoteBreadcrumb";
import ToggleEdit from "./ToggleEdit";

const NoteToolbar = ({ dialogRef }) => {
  return (
    <Box display="flex" flexGrow={1} alignItems="center">
      <Box flexGrow={1}>
        <NoteBreadcrumb />
      </Box>
      <Box marginLeft="auto">
        <ToggleEdit />
      </Box>
    </Box>
  );
};

export default NoteToolbar;
