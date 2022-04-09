import { Dialog, Menu, MenuItem } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import DialogAddSubNote from "../dialogs/addSubNote";
import DialogChangeIcon from "../dialogs/changeIcon";
import DialogDeleteNote from "../dialogs/delete";
import DialogRenameNote from "../dialogs/rename";
import useFetchNoteData from "../hooks/useFetchNoteData";
import useNoteActions from "../hooks/useNoteActions";

interface Props {
  handleClose: () => void;
  clickPosition: {
    mouseX: number | null;
    mouseY: number | null;
  };
  clickedNodeId: string | null;
}

enum ContextMenuDialogs {
  NONE = -1,
  ADD_SUB_NOTE = 0,
  DELETE_NOTE = 1,
  RENAME_NOTE = 2,
  CHANGE_ICON = 3,
}

const NoteSidebarContextMenu = ({
  handleClose,
  clickPosition,
  clickedNodeId,
}: Props) => {
  const { noteData } = useFetchNoteData(clickedNodeId);
  const { updateNoteName, addSubNote, deleteNote, updateNoteIcon } =
    useNoteActions(clickedNodeId as string);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openedDialog, setOpenedDialog] = useState<ContextMenuDialogs>(
    ContextMenuDialogs.NONE
  );
  const openDialog = (type: ContextMenuDialogs) => (e: SyntheticEvent) => {
    setOpenedDialog(type);
    handleClose();
    setDialogOpen(true);
  };
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <Menu
        keepMounted
        open={clickPosition.mouseY !== null && noteData != null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          clickPosition.mouseY !== null && clickPosition.mouseX !== null
            ? { top: clickPosition.mouseY, left: clickPosition.mouseX }
            : undefined
        }
      >
        <MenuItem dense onClick={openDialog(ContextMenuDialogs.ADD_SUB_NOTE)}>
          Add Sub Note
        </MenuItem>
        <MenuItem dense onClick={openDialog(ContextMenuDialogs.DELETE_NOTE)}>
          Delete Note
        </MenuItem>
        <MenuItem dense onClick={openDialog(ContextMenuDialogs.RENAME_NOTE)}>
          Rename Note
        </MenuItem>
        <MenuItem dense onClick={openDialog(ContextMenuDialogs.CHANGE_ICON)}>
          Change Icon
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        {openedDialog === ContextMenuDialogs.ADD_SUB_NOTE && (
          <DialogAddSubNote
            handleClose={handleCloseDialog}
            noteDetails={noteData}
            action={addSubNote}
          />
        )}
        {openedDialog === ContextMenuDialogs.DELETE_NOTE && (
          <DialogDeleteNote
            handleClose={handleCloseDialog}
            noteDetails={noteData}
            action={deleteNote}
          />
        )}
        {openedDialog === ContextMenuDialogs.RENAME_NOTE && (
          <DialogRenameNote
            handleClose={handleCloseDialog}
            noteDetails={noteData}
            action={updateNoteName}
          />
        )}
        {openedDialog === ContextMenuDialogs.CHANGE_ICON && (
          <DialogChangeIcon
            handleClose={handleCloseDialog}
            noteDetails={noteData}
            action={updateNoteIcon}
          />
        )}
      </Dialog>
    </>
  );
};

export default NoteSidebarContextMenu;
