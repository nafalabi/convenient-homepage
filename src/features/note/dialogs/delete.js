import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { Subject } from "@mui/icons-material";

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
        <DialogContentText>
          Are you sure to delete this note?
        </DialogContentText>
        <Box clone display="inline-flex">
          <DialogContentText>
            <Subject /> &nbsp; {noteDetails?.notename}
          </DialogContentText>
        </Box>
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
