import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import IconRenderer from "components/IconRenderer";
import Note from "app/storage/dexie/Note";
import { IconType } from "constant";

interface Props {
  action: () => void;
  handleClose: () => void;
  noteDetails: Note | null | undefined;
}

const DialogDeleteNote = ({ action, handleClose, noteDetails }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action();
        handleClose();
      }}
    >
      <DialogTitle>Delete Note</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure to delete this note?</DialogContentText>
        <DialogContentText sx={{ display: "inline-flex", mt: 1 }}>
          <IconRenderer
            iconId={noteDetails?.iconId ?? "Subject"}
            iconType={noteDetails?.iconType ?? IconType.MATERIAL_ICON}
          />{" "}
          &nbsp; {noteDetails?.notename}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Delete
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogDeleteNote;
