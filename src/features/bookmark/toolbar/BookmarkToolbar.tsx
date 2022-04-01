import React from "react";
import { Box } from "@mui/material";
import BookmarkBreadcrumb from "./BookmarkBreadcrumb";
import LayoutSwitcher from "./LayoutSwitcher";

const BookmarkToolbar = () => {
  return (
    <Box display="flex" flexGrow={1} alignItems="center">
      <Box flexGrow={1}>
        <BookmarkBreadcrumb />
      </Box>
      <Box>
        <LayoutSwitcher />
      </Box>
    </Box>
  );
};

export default BookmarkToolbar;
