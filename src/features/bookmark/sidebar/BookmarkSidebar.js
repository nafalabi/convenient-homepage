import React from "react";
import { Box } from "@mui/material";
import useSubscribeBookmarks from "../hooks/useSubscribeBookmarks";
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../slice";
import useContextMenu from "../hooks/useContextMenu";
import SidebarContextMenu from "./SidebarContextMenu";
import TreeViewDnd from "components/TreeViewDnd";
import { IconType } from "constant";
import { reorderBookmark } from "../utils";

const BookmarkSidebar = () => {
  const dispatch = useDispatch();
  const bookmarks = useSubscribeBookmarks(true);
  const selectedBookmark = useSelector(selectors.selectedBookmark);
  const expandedTreeNodeIds = useSelector(selectors.expandedTreeNodeIds);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu();

  const selectNode = (e, id) => {
    if (e.target.closest(".MuiTreeItem-iconContainer")) {
      dispatch(actions.toggleExpandNode(String(id)));
      return;
    }
    dispatch(actions.selectBookmark(String(id)));
  };

  return (
    <Box pb={4} onContextMenu={handleClick}>
      <TreeViewDnd
        list={bookmarks}
        expanded={expandedTreeNodeIds}
        selected={String(selectedBookmark)}
        onNodeSelect={selectNode}
        onNodeDrop={reorderBookmark}
        resolveData={(data) => {
          return {
            id: data.id,
            label: data.title,
            iconId: "Folder",
            iconType: IconType.MATERIAL_ICON,
            hasChildren: (data.children?.length ?? 0) > 0,
            children: data.children,
            dontRender: data.url !== undefined,
          };
        }}
        useInternalDndProvider={false}
      />
      <SidebarContextMenu
        handleClose={handleClose}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </Box>
  );
};

export default BookmarkSidebar;
