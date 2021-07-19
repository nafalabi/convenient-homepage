import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "./slice";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import { Box } from "@material-ui/core";
import BookmarkSidebar from "./BookmarkSidebar";
import BookmarkMain from "./BookmarkMain";
import BookmarkBreadcrumb from "./BookmarkBreadcrumb";

const Bookmark = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleBookmark())}
      title="Bookmarks"
      ToolbarItemComponent={({ dialogRef }) => (
        <Box>
          <BookmarkBreadcrumb />
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
