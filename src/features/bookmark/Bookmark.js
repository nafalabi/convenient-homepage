/* global chrome */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "./slice";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import BookmarkSidebar from "./sidebar/BookmarkSidebar";
import BookmarkMain from "./main/BookmarkMain";
import BookmarkToolbar from "./toolbar/BookmarkToolbar";
import { DragDropContext } from "react-beautiful-dnd";

const Bookmark = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();

  return (
    <DragDropContext
      // onDragEnd={console.log}
      onDragEnd={async ({
        draggableId,
        destination,
        combine,
        source: { index: sourceIndex },
        ...props
      }) => {
        let parentId = destination?.droppableId || combine?.draggableId;
        const index = destination?.index || 0;
        const targetIndex = index > sourceIndex ? index + 1 : index;

        if (parentId.includes("bookmark")) return;

        // clear prefix
        ["list", "tree", "folder"].forEach((word) => {
          parentId = parentId.replace(`${word}-`, "");
        });
        ["folder", "bookmark"].forEach((word) => {
          draggableId = draggableId.replace(`${word}-`, "");
        });

        // do action
        await chrome.bookmarks.move(String(draggableId), {
          index: targetIndex,
          parentId: String(parentId),
        });
      }}
    >
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
    </DragDropContext>
  );
};

export default Bookmark;
