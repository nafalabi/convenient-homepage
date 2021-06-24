/* global chrome */
import React, { useState } from "react";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { ExpandMore, ChevronRight, Bookmark } from "@material-ui/icons";
import { TreeView } from "@material-ui/lab";
import BookmarkTreeListItem from "./BookmarkTreeListItem";
import useSubscribeBookmarks from "./hooks/useSubscribeBookmarks";
import { useSelector } from "react-redux";
import { selectors } from "./slice";

const BookmarkSidebar = () => {
  const bookmarks = useSubscribeBookmarks();
  const selectedBookmark = useSelector(selectors.selectedBookmark);

  console.log(bookmarks);

  const mapItem = (arrayList) => {
    return arrayList.map((bookmark) => {
      const bookmarkDomain = bookmark.url ? new URL(bookmark.url).hostname : "";
      const icon = bookmarkDomain ? (
        `https://www.google.com/s2/favicons?domain=${bookmarkDomain}`
      ) : (
        <Bookmark />
      );

      const props = {
        key: bookmark.id,
        nodeId: String(bookmark.id),
        labelText: bookmark.title,
        labelIcon: icon,
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
    });
  };

  // const [clickedItemType, setClickedItemType] = useState("file"); // folder or bookmark
  // const [clickPosition, setClickPosition] = useState({
  //   mouseX: null,
  //   mouseY: null,
  // });
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   console.log(event.target);
  //   const clickedPosition = {
  //     mouseX: event.clientX - 2,
  //     mouseY: event.clientY - 4,
  //   };
  //   const nodeId = event.target.getAttribute("data");
  //   if (nodeId) {
  //     chrome.bookmarks.get(nodeId, ([bookmark]) => {
  //       console.log(bookmark);
  //       console.log(bookmark?.dateGroupModified);
  //       if (bookmark?.dateGroupModified) {
  //         setClickedItemType("folder");
  //       } else {
  //         setClickedItemType("file");
  //       }
  //       setClickPosition(clickedPosition);
  //     });
  //   }
  // };
  // const handleClose = () => {
  //   setClickPosition({
  //     mouseX: null,
  //     mouseY: null,
  //   });
  // };

  return (
    <Box pb={4} 
    // onContextMenu={handleClick}
    >
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        // expanded={expandedNoteIds}
        selected={String(selectedBookmark)}
        // onNodeToggle={toggleExpandNode}
        // onNodeSelect={(e, id) => dispatch(actions.selectNote(parseInt(id)))}
      >
        {mapItem(bookmarks)}
      </TreeView>
      {/* <Menu
        keepMounted
        open={clickPosition.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          clickPosition.mouseY !== null && clickPosition.mouseX !== null
            ? { top: clickPosition.mouseY, left: clickPosition.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        {clickedItemType === "folder" && [
          <MenuItem key="add-bookmark" onClick={handleClose}>
            Add New Bookmark
          </MenuItem>,
          <MenuItem key="add-folder" onClick={handleClose}>
            Add New Folder
          </MenuItem>,
        ]}
      </Menu> */}
    </Box>
  );
};

export default BookmarkSidebar;
