import { Dialog } from "@material-ui/core";
import React from "react";
import { useDialog } from "../hooks/useDialog";
import DialogTestImageProvider, { DIALOG_TESTPROVIDER } from "./TestImageProvider";

const DialogController = () => {
  const { open, dialogId, closeDialog } = useDialog();
  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="md">
      {dialogId === DIALOG_TESTPROVIDER && <DialogTestImageProvider />}
    </Dialog>
  );
};

export default DialogController;
