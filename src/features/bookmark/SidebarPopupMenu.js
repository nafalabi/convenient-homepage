import { Menu, MenuItem } from "@material-ui/core";
import React from "react";
import useBookmarksActions from "./hooks/useBookmarksActions";

const SidebarPopupMenu = ({ clickPosition, handleClose, clickedNodeId }) => {
  const {
    bookmarkDetail,
    createFolder,
    createBookmark,
    editBookmark,
    deleteBookmark,
  } = useBookmarksActions(clickedNodeId);

  return (
    <Menu
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
      <MenuItem dense onClick={handleClose}>
        Edit
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Delete
      </MenuItem>
      {bookmarkDetail?.url === undefined && [
        <MenuItem dense key="add-bookmark" onClick={handleClose}>
          Add new bookmark
        </MenuItem>,
        <MenuItem dense key="add-folder" onClick={handleClose}>
          Add new folder
        </MenuItem>,
      ]}
    </Menu>
  );
};

export default SidebarPopupMenu;
