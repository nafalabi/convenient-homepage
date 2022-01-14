import { Dialog } from "@mui/material";
import React from "react";
import { useDialog } from "../hooks/useDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import EditProviderParam from "./EditProviderParam";

export enum Dialogs {
  EDIT_PROVIDER = 0,
  CONFIRMATION_DIALOG = 1,
}

const DialogController = () => {
  const { isOpen, dialogId, closeDialog } = useDialog<Dialogs, any>();

  return (
    <Dialog open={isOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
      {dialogId === Dialogs.EDIT_PROVIDER && <EditProviderParam />}
      {dialogId === Dialogs.CONFIRMATION_DIALOG && <ConfirmationDialog />}
    </Dialog>
  );
};

export default DialogController;
