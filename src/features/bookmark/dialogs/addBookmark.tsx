import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

export interface DialogAddBookmarkProps {
  action: (title: string, url: string) => void;
  handleClose: () => void;
}

const DialogAddBookmark = ({ action, handleClose }: DialogAddBookmarkProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
    },
    onSubmit: ({ title, url }) => {
      action(title, url);
      handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Add Bookmark</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Name"
          type="name"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <TextField
          margin="dense"
          id="url"
          name="url"
          label="URL"
          type="url"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.url}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogAddBookmark;
