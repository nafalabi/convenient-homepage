import React, { useCallback, useContext, useState } from "react";

interface DialogContextValue<TDialogID, TOpenArg> {
  isOpen: boolean;
  dialogId: TDialogID;
  closeDialog: () => void;
  openDialog: (id: number, args: TOpenArg) => void;
  args: TOpenArg;
}

export const DialogContext = React.createContext<any>({
  isOpen: false,
  dialogId: -1,
  closeDialog: () => {},
  openDialog: () => {},
  args: undefined,
});

export const DialogProvider = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(-1);
  const [args, setArgs] = useState<any | undefined>();

  const closeDialog = useCallback(() => {
    setOpen(false);
    setDialogId(-1);
    // avoid flickering
    setTimeout(() => {
      setArgs(undefined);
    }, 300);
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
      value={{ isOpen: open, dialogId, closeDialog, openDialog, args }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = <TDialogID extends number, TOpenArg = any>() => {
  const { isOpen, dialogId, closeDialog, openDialog, args } =
    useContext<DialogContextValue<TDialogID, TOpenArg>>(DialogContext);
  return { isOpen, dialogId, closeDialog, openDialog, args };
};
