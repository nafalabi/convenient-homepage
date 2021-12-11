import { Dialog } from "@mui/material";
import React from "react";
import { useDialog } from "../hooks/useDialog";
import DialogTestImageProvider, { DIALOG_TESTPROVIDER } from "./TestImageProvider";

const DialogController = () => {
  const { open, dialogId, closeDialog } = useDialog();
  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="md" fullWidth>
      {dialogId === DIALOG_TESTPROVIDER && <DialogTestImageProvider />}
    </Dialog>
  );
};

export default DialogController;
