import { Dialog } from "@mui/material";
import React from "react";
import { useDialog } from "../hooks/useDialog";
import EditProviderParam from "./EditProviderParam";

export enum Dialogs {
  EDIT_PROVIDER = 0,
}

const DialogController = () => {
  const { isOpen, dialogId, closeDialog } = useDialog<Dialogs, any>();

  return (
    <Dialog open={isOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
      {dialogId === Dialogs.EDIT_PROVIDER && <EditProviderParam />}
    </Dialog>
  );
};

export default DialogController;
