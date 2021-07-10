import React, { useContext, useState } from "react";
import { Dialog } from "@material-ui/core";

export const GlobalDialogContext = React.createContext({
  dialogOpen: false,
  setDialogOpen: () => {},
});

export const GlobalDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <GlobalDialogContext.Provider
      value={{
        dialogOpen,
        setDialogOpen,
      }}
    >
      {children}
    </GlobalDialogContext.Provider>
  );
};

export const GlobalDialog = ({ children }) => {
  const { dialogOpen, setDialogOpen } = useContext(GlobalDialogContext);
  return (
    <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
      {children}
    </Dialog>
  );
};
