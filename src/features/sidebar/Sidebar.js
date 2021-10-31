import React from "react";
import { actions, selectors } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import SidebarBody from "./SidebarBody";
import { IconButton, styled, SwipeableDrawer } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { Menu } from "@mui/icons-material";

const SidebarTogglerBtn = withStyles({
  root: {
    position: "fixed",
    top: "0.5rem",
    left: "1rem",
    color: "#ffffffad",
    "&:hover": {
      color: "#fff",
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
        <Menu fontSize="large" />
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
