import { Menu, MenuItem } from "@material-ui/core";
import React, { useContext, useState } from "react";
import useBookmarksActions from "./hooks/useBookmarksActions";
import {
  GlobalDialog,
  GlobalDialogContext,
} from "../../components/GlobalDialog";
import DialogEditBookmark from "./dialogs/edit";
import DialogDeleteBookmark from "./dialogs/delete";
import DialogAddBookmark from "./dialogs/addBookmark";
import DialogAddBookmarkFolder from "./dialogs/addFolder";

const SidebarContextMenu = ({ clickPosition, handleClose, clickedNodeId }) => {
  const {
    bookmarkDetail,
    createFolder,
    createBookmark,
    editBookmark,
    deleteBookmark,
  } = useBookmarksActions(clickedNodeId);
  const { setDialogOpen } = useContext(GlobalDialogContext);
  const [openedDialog, setOpenedDialog] = useState(-1);
  const openDialog = (type) => (e) => {
    setOpenedDialog(type);
    handleClose();
    setDialogOpen(true);
  };
  const handleCloseDialog = () => setDialogOpen(false);

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
      <GlobalDialog>
        {openedDialog === 0 && (
          <DialogEditBookmark
            action={editBookmark}
            handleClose={handleCloseDialog}
            bookmarkDetail={bookmarkDetail}
          />
        )}
        {openedDialog === 1 && (
          <DialogDeleteBookmark
            action={deleteBookmark}
            handleClose={handleCloseDialog}
            bookmarkDetail={bookmarkDetail}
          />
        )}
        {openedDialog === 2 && (
          <DialogAddBookmark
            action={createBookmark}
            handleClose={handleCloseDialog}
            bookmarkDetail={bookmarkDetail}
          />
        )}
        {openedDialog === 3 && (
          <DialogAddBookmarkFolder
            action={createFolder}
            handleClose={handleCloseDialog}
            bookmarkDetail={bookmarkDetail}
          />
        )}
      </GlobalDialog>
    </>
  );
};

export default SidebarContextMenu;
