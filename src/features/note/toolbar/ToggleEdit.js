import { FormControlLabel, Switch } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";

const useStyles = makeStyles({
  checked: {
    "& + $track": {
      backgroundColor: "white",
    },
  },
  track: {},
});

const ToggleEdit = () => {
  const dispatch = useDispatch();
  const editable = useSelector(selectors.editable);
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Switch
          name="editable"
          color="default"
          classes={{ checked: classes.checked, track: classes.track }}
          onChange={() => dispatch(actions.toggleEditable())}
          checked={editable}
        />
      }
      label="Editable"
    />
  );
};

export default ToggleEdit;
