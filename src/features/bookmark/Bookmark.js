import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "./slice";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import { Box, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import BookmarkSidebar from "./BookmarkSidebar";
import BookmarkMain from "./BookmarkMain";

const Bookmark = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleNote())}
      title="Bookmarks"
      ToolbarItemComponent={({ dialogRef }) => (
        <Box marginLeft="auto">
          <IconButton color="inherit" onClick={() => {}}>
            <Home />
          </IconButton>
        </Box>
      )}
      SidebarComponent={({ dialogRef }) => (
        <BookmarkSidebar dialogRef={dialogRef} />
      )}
      ContentComponent={({ dialogRef }) => (
        <BookmarkMain dialogRef={dialogRef} />
      )}
    />
  );
};

export default Bookmark;
