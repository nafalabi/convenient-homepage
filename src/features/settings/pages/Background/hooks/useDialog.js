import React, { useCallback, useContext, useState } from "react";

export const DialogContext = React.createContext({});

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(-1);
  const [args, setArgs] = useState(null);
  const closeDialog = useCallback(() => {
    setOpen(false);
    setArgs(null);
  }, [setOpen]);
  const openDialog = useCallback(
    (id, argsGiven) => {
      setOpen(true);
      setDialogId(id);
      if (argsGiven) setArgs(argsGiven);
    },
    [setOpen, setDialogId]
  );

  return (
    <DialogContext.Provider
      value={{ open, dialogId, closeDialog, openDialog, args }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const { open, dialogId, closeDialog, openDialog, args } =
    useContext(DialogContext);
  return { open, dialogId, closeDialog, openDialog, args };
};
