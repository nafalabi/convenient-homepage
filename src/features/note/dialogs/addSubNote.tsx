import React from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import { useFormik } from "formik";
import Note from "app/storage/dexie/Note";

interface Props {
  action: (title: string) => void;
  handleClose: () => void;
  noteDetails: Note | null | undefined;
}

const DialogAddSubNote = ({ action, handleClose, noteDetails }: Props) => {
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
        <DialogContentText sx={{ display: "inline-flex" }}>
          Parent: &nbsp;
          {noteDetails?.notename}
        </DialogContentText>
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
