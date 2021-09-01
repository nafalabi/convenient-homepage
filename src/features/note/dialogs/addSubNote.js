import React from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  DialogContentText,
} from "@material-ui/core";
import { useFormik } from "formik";

const DialogAddSubNote = ({ action, handleClose, noteDetails }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async (values) => {
      action(values.title);
      handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Add Sub Note</DialogTitle>
      <DialogContent>
        <Box clone display="inline-flex">
          <DialogContentText>
            Parent: &nbsp;
            {/* <Subject />  */}
            {/* &nbsp;  */}
            {noteDetails?.notename}
          </DialogContentText>
        </Box>
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
          required
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogAddSubNote;
