import React, { useCallback, useContext, useState } from "react";

export const DialogContext = React.createContext({});

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(-1);
  const closeDialog = useCallback(() => setOpen(false), [setOpen]);
  const openDialog = useCallback(
    (id) => {
      setOpen(true);
      setDialogId(id);
    },
    [setOpen, setDialogId]
  );

  return (
    <DialogContext.Provider value={{ open, dialogId, closeDialog, openDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const { open, dialogId, closeDialog, openDialog } = useContext(DialogContext);
  return { open, dialogId, closeDialog, openDialog };
};
