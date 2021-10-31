import { Menu, MenuItem, Dialog } from "@mui/material";
import React, { useState } from "react";
import useBookmarksActions from "../hooks/useBookmarksActions";
import DialogEditBookmark from "../dialogs/edit";
import DialogDeleteBookmark from "../dialogs/delete";
import DialogAddBookmark from "../dialogs/addBookmark";
import DialogAddBookmarkFolder from "../dialogs/addFolder";
import { useDispatch } from "react-redux";
import { actions } from "../slice";

const SidebarContextMenu = ({ clickPosition, handleClose, clickedNodeId }) => {
  const dispatch = useDispatch();
  const {
    bookmarkDetail,
    createFolder,
    createBookmark,
    editBookmark,
    deleteBookmark,
  } = useBookmarksActions(clickedNodeId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openedDialog, setOpenedDialog] = useState(-1);
  const openDialog = (type) => (e) => {
    setOpenedDialog(type);
    handleClose();
    setDialogOpen(true);
  };
  const handleCloseDialog = () => setDialogOpen(false);
  const deleteBookmarkSafely = async () => {
    console.log(dispatch(actions.selectBookmark(bookmarkDetail.parentId)));
    await deleteBookmark();
  };

  return (
    <>
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
        {bookmarkDetail?.parentId !== "0" && [
          <MenuItem dense key="edit" onClick={openDialog(0)}>
            Edit
          </MenuItem>,
          <MenuItem dense key="delete" onClick={openDialog(1)}>
            Delete
          </MenuItem>,
        ]}
        {bookmarkDetail?.url === undefined && [
          <MenuItem dense key="add-bookmark" onClick={openDialog(2)}>
            Add new bookmark
          </MenuItem>,
          <MenuItem dense key="add-folder" onClick={openDialog(3)}>
            Add new folder
          </MenuItem>,
        ]}
      </Menu>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        {openedDialog === 0 && (
          <DialogEditBookmark
            action={editBookmark}
            handleClose={handleCloseDialog}
            bookmarkDetail={bookmarkDetail}
          />
        )}
        {openedDialog === 1 && (
          <DialogDeleteBookmark
            action={deleteBookmarkSafely}
            handleClose={handleCloseDialog}
            bookmarkDetail={bookmarkDetail}
          />
        )}
        {openedDialog === 2 && (
          <DialogAddBookmark
            action={createBookmark}
            handleClose={handleCloseDialog}
          />
        )}
        {openedDialog === 3 && (
          <DialogAddBookmarkFolder
            action={createFolder}
            handleClose={handleCloseDialog}
          />
        )}
      </Dialog>
    </>
  );
};

export default SidebarContextMenu;
