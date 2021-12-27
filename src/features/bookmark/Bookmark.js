import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "./slice";
import PanelWithSidebar from "components/PanelWithSidebar";
import BookmarkSidebar from "./sidebar/BookmarkSidebar";
import BookmarkMain from "./main/BookmarkMain";
import BookmarkToolbar from "./toolbar/BookmarkToolbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Bookmark = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();

  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <PanelWithSidebar
        open={isOpen}
        toggle={() => dispatch(actions.toggleBookmark())}
        title="Bookmarks"
        ToolbarItemComponent={({ dialogRef }) => (
          <BookmarkToolbar dialogRef={dialogRef} />
        )}
        SidebarComponent={({ dialogRef }) => (
          <BookmarkSidebar dialogRef={dialogRef} />
        )}
        ContentComponent={({ dialogRef }) => (
          <BookmarkMain dialogRef={dialogRef} />
        )}
      />
    </DndProvider>
  );
};

export default Bookmark;
