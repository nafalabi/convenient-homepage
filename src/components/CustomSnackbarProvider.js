import React from "react";
import { SnackbarProvider } from "notistack";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({ label: { fontWeight: "bold" } });

const CustomSnackbarProvider = ({ children }) => {
  const classes = useStyles();
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      action={(key) => (
        <Button
          onClick={onClickDismiss(key)}
          color="inherit"
          classes={{ label: classes.label }}
        >
          Dismiss
        </Button>
      )}
      maxSnack={5}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
