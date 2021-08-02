import React from "react";
import { Box } from "@material-ui/core";
import { ExpandMore, ChevronRight, Bookmark } from "@material-ui/icons";
import { TreeView } from "@material-ui/lab";
import BookmarkTreeListItem from "./BookmarkTreeListItem";
import useSubscribeBookmarks from "../hooks/useSubscribeBookmarks";
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../slice";
import useSidebarContextMenu from "../hooks/useSidebarContextMenu";
import SidebarContextMenu from "./SidebarContextMenu";

const BookmarkSidebar = () => {
  const dispatch = useDispatch();
  const bookmarks = useSubscribeBookmarks();
  const selectedBookmark = useSelector(selectors.selectedBookmark);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useSidebarContextMenu();

  const mapItem = (arrayList) => {
    return arrayList
      .map((bookmark) => {
        const type = bookmark.url ? "bookmark" : "folder";
        if (type === "bookmark") return false;

        const props = {
          key: bookmark.id,
          nodeId: String(bookmark.id),
          labelText: bookmark.title,
          labelIcon: <Bookmark />,
          ActionButton: null,
        };

        if (bookmark.children?.length > 0) {
          return (
            <BookmarkTreeListItem {...props}>
              {bookmark.children && mapItem(bookmark.children)}
            </BookmarkTreeListItem>
          );
        }

        return <BookmarkTreeListItem {...props} />;
      })
      .filter((data) => data);
  };

  return (
    <Box pb={4} onContextMenu={handleClick}>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        // expanded={expandedNoteIds}
        selected={String(selectedBookmark)}
        // onNodeToggle={toggleExpandNode}
        onNodeSelect={(e, id) => dispatch(actions.selectBookmark(String(id)))}
      >
        {mapItem(bookmarks)}
      </TreeView>
      <SidebarContextMenu
        handleClose={handleClose}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </Box>
  );
};

export default BookmarkSidebar;
