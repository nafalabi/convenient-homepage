import React from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";

const DialogEditBookmark = ({ action, handleClose, bookmarkDetail }) => {
  const formik = useFormik({
    initialValues: {
      title: bookmarkDetail.title,
      url: bookmarkDetail.url,
    },
    onSubmit: async (values) => {
      action(values.title, values.url);
			handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Edit Bookmark</DialogTitle>
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
        {bookmarkDetail.url && (
          <TextField
            autoFocus
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
        )}
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

export default DialogEditBookmark;
