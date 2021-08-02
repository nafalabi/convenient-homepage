import { Button, ButtonGroup } from "@material-ui/core";
import { Apps, Reorder } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../slice";

const LayoutSwitcher = () => {
  const dispatch = useDispatch();

  return (
    <ButtonGroup>
      <Button
        size="small"
        onClick={() => dispatch(actions.changeLayoutMode("grid"))}
      >
        <Apps fontSize="small" />
      </Button>
      <Button
        size="small"
        onClick={() => dispatch(actions.changeLayoutMode("list"))}
      >
        <Reorder fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};

export default LayoutSwitcher;
