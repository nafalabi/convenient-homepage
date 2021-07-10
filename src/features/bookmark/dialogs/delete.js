import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const DialogDeleteBookmark = ({ action, handleClose, bookmarkDetail }) => {
  return (
    <form>
      <DialogTitle>Delete Bookmark</DialogTitle>
      <DialogContent></DialogContent>
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

export default DialogDeleteBookmark;
