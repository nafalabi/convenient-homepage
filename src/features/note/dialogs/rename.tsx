import React from "react";
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import Note from "app/db/schema/Note";

interface Props {
  action: (title: string) => void;
  handleClose: () => void;
  noteDetails: Note | null | undefined;
}

const DialogRenameNote = ({ action, handleClose, noteDetails }: Props) => {
  const formik = useFormik({
    initialValues: {
      title: noteDetails?.notename,
    },
    onSubmit: async (values) => {
      action(values.title ?? "");
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
