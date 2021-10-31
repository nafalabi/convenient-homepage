import React from "react";
import { Box } from "@mui/material";
import { ExpandMore, ChevronRight, Folder } from "@mui/icons-material";
import { TreeView } from "@mui/lab";
import BookmarkTreeListItem from "./BookmarkTreeListItem";
import useSubscribeBookmarks from "../hooks/useSubscribeBookmarks";
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../slice";
import useContextMenu from "../hooks/useContextMenu";
import SidebarContextMenu from "./SidebarContextMenu";
import { Droppable } from "react-beautiful-dnd";

const BookmarkSidebar = () => {
  const dispatch = useDispatch();
  const bookmarks = useSubscribeBookmarks();
  const selectedBookmark = useSelector(selectors.selectedBookmark);
  const expandedTreeNodeIds = useSelector(selectors.expandedTreeNodeIds);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu();

  const mapItem = (arrayList) => {
    return arrayList
      .map((bookmark) => {
        const type = bookmark.url ? "bookmark" : "folder";
        if (type === "bookmark") return false;

        const props = {
          key: bookmark.id,
          nodeId: String(bookmark.id),
          labelText: bookmark.title,
          labelIcon: <Folder />,
          ActionButton: null,
        };

        return (
          <Droppable key={bookmark.id} droppableId={`tree-${bookmark.id}`}>
            {(provided, snapshot) => (
              <BookmarkTreeListItem
                {...props}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {bookmark.children?.length > 0 && mapItem(bookmark.children)}
              </BookmarkTreeListItem>
            )}
          </Droppable>
        );
      })
      .filter((data) => data);
  };

  return (
    <Box pb={4} onContextMenu={handleClick}>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expandedTreeNodeIds}
        selected={String(selectedBookmark)}
        onNodeSelect={(e, id) => {
          if (e.target.closest(".MuiTreeItem-iconContainer")) {
            dispatch(actions.toggleExpandNode(String(id)));
            return;
          }
          dispatch(actions.selectBookmark(String(id)));
        }}
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
