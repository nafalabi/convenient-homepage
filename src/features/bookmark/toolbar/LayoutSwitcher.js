import { Button, ButtonGroup, withStyles } from "@material-ui/core";
import { Apps, Reorder } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";

const StyledButtonGroup = withStyles({
  grouped: {
    color: "white",
    borderColor: "#ffffff59",
  },
  root: {
    "& .selected": {
      backgroundColor: "#ffffff40",
      borderColor: "#ffffff59",
    },
  },
})(ButtonGroup);

const LayoutSwitcher = () => {
  const dispatch = useDispatch();
  const layoutMode = useSelector(selectors.layoutMode);

  return (
    <StyledButtonGroup>
      <Button
        size="small"
        onClick={() => dispatch(actions.changeLayoutMode("grid"))}
        className={layoutMode === "grid" ? "selected" : ""}
      >
        <Apps fontSize="small" />
      </Button>
      <Button
        size="small"
        onClick={() => dispatch(actions.changeLayoutMode("list"))}
        className={layoutMode === "list" ? "selected" : ""}
      >
        <Reorder fontSize="small" />
      </Button>
    </StyledButtonGroup>
  );
};

export default LayoutSwitcher;
