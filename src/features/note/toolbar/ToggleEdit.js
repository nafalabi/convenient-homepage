import { FormControlLabel, makeStyles, Switch } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  checked: {
    "& + $track": {
      backgroundColor: "white",
    },
  },
  track: {},
});

const ToggleEdit = () => {
  const classes = useStyles();
  return (
    <FormControlLabel
      control={
        <Switch
          name="editable"
          color="default"
          classes={{ checked: classes.checked, track: classes.track }}
        />
      }
      label="Editable"
    />
  );
};

export default ToggleEdit;
