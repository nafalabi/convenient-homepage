import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";

const DialogAddBookmark = ({ action, handleClose }) => {
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
