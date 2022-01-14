import React from "react";
import { useDialog } from "../hooks/useDialog";
import { Dialogs } from "./DialogController";
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Arguments {
  callback?: (response: boolean) => void;
  message?: string;
  title?: string;
}

export const useConfirmationDialog = () => {
  const values = useDialog<Dialogs, Arguments>();

  return {
    ...values,
    openDialog: (
      title?: string,
      message?: string,
      callback?: (response: boolean) => void
    ) =>
      values.openDialog(Dialogs.CONFIRMATION_DIALOG, {
        title,
        message,
        callback,
      }),
  };
};

const ConfirmationDialog = () => {
  const {
    args: { callback, message, title },
    closeDialog,
  } = useConfirmationDialog();

  const handleOK = () => {
    callback && callback(true);
    closeDialog();
  };

  const handleCancel = () => {
    callback && callback(false);
    closeDialog();
  };

  return (
    <Box>
      <DialogTitle>{title ?? ""}</DialogTitle>
      <DialogContent>
        {message && (
          <DialogContentText sx={{ whiteSpace: "pre-wrap" }}>
            {message}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={handleOK}
        >
          OK
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ConfirmationDialog;
