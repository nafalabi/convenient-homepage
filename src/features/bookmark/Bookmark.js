import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "./slice";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import BookmarkSidebar from "./sidebar/BookmarkSidebar";
import BookmarkMain from "./main/BookmarkMain";
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
        <BookmarkBreadcrumb dialogRef={dialogRef} />
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
