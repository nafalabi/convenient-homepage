import { Dialog, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import DialogAddSubNote from "../dialogs/addSubNote";
import DialogDeleteNote from "../dialogs/delete";
import DialogRenameNote from "../dialogs/rename";
import useFetchNoteData from "../hooks/useFetchNoteData";
import useNoteActions from "../hooks/useNoteActions";

const NoteSidebarContextMenu = ({
  handleClose,
  clickPosition,
  clickedNodeId,
}) => {
  const noteDetails = useFetchNoteData(clickedNodeId);
  const { updateNoteName, addSubNote, deleteNote } =
    useNoteActions(noteDetails);
  const [dialogOpen, setDialogOpen] = useState(false);
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
        open={clickPosition.mouseY !== null && noteDetails != null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          clickPosition.mouseY !== null && clickPosition.mouseX !== null
            ? { top: clickPosition.mouseY, left: clickPosition.mouseX }
            : undefined
        }
      >
        <MenuItem dense onClick={openDialog(0)}>
          Add Sub Note
        </MenuItem>
        <MenuItem dense onClick={openDialog(1)}>
          Delete Note
        </MenuItem>
        <MenuItem dense onClick={openDialog(2)}>
          Rename Note
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        {openedDialog === 0 && (
          <DialogAddSubNote
            handleClose={handleCloseDialog}
            noteDetails={noteDetails}
            action={addSubNote}
          />
        )}
        {openedDialog === 1 && (
          <DialogDeleteNote
            handleClose={handleCloseDialog}
            noteDetails={noteDetails}
            action={deleteNote}
          />
        )}
        {openedDialog === 2 && (
          <DialogRenameNote
            handleClose={handleCloseDialog}
            noteDetails={noteDetails}
            action={updateNoteName}
          />
        )}
      </Dialog>
    </>
  );
};

export default NoteSidebarContextMenu;
