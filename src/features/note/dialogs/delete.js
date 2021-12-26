import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { RenderIcon } from "components/IconPicker";

const DialogDeleteNote = ({ action, handleClose, noteDetails }) => {
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
          <RenderIcon icon={noteDetails} /> &nbsp; {noteDetails?.notename}
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
