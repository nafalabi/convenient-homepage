import React from "react";
import { actions, selectors } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import SidebarBody from "./SidebarBody";
import {
  IconButton,
  styled,
  SwipeableDrawer,
  withStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const SidebarTogglerBtn = withStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,0.95)",
    margin: "0.5rem",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.95)",
    },
  },
})(IconButton);

const SidebarRoot = styled("div")({});

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.isOpen);

  return (
    <SidebarRoot>
      <SidebarTogglerBtn
        onClick={() => dispatch(actions.toggleSidebar())}
        color="inherit"
        size="small"
      >
        <Menu />
      </SidebarTogglerBtn>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={() => dispatch(actions.toggleSidebar())}
        onOpen={() => dispatch(actions.toggleSidebar())}
      >
        <SidebarBody />
      </SwipeableDrawer>
    </SidebarRoot>
  );
};

export default Sidebar;
