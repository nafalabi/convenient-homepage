import React from "react";
import { Box } from "@material-ui/core";
import BookmarkBreadcrumb from "./BookmarkBreadcrumb";
import LayoutSwitcher from "./LayoutSwitcher";

const BookmarkToolbar = () => {
  return (
    <Box display="flex" flexGrow={1}>
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
