import React, { useCallback, useContext, useState } from "react";
import { IBackgroundSettings } from "../../../../../app/storage/app-data/backgroundSettings";

interface DialogContextValue {
  open: boolean;
  dialogId: number;
  closeDialog: () => void;
  openDialog: (id: number, args: IBackgroundSettings) => void;
  args: IBackgroundSettings | null;
}

export const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  dialogId: -1,
  closeDialog: () => {},
  openDialog: () => {},
  args: null,
});

export const DialogProvider = ({ children }: { children: JSX.Element }) => {
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(-1);
  const [args, setArgs] = useState<IBackgroundSettings | null>(null);

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
