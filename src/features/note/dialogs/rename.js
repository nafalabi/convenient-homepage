import React from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";

const DialogRenameNote = ({ action, handleClose, noteDetails }) => {
  const formik = useFormik({
    initialValues: {
      title: noteDetails?.notename,
    },
    onSubmit: async (values) => {
      action({ target: { value: values.title } });
      handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Rename Note</DialogTitle>
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

export default DialogRenameNote;
