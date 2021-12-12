import React from "react";
import { actions } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import DrawerBody from "./DrawerBody";
import { IconButton, styled, SwipeableDrawer } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { Menu } from "@mui/icons-material";

const DrawerTogglerBtn = withStyles({
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

const DrawerRoot = styled("div")({});

const Drawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(({ drawer }) => drawer.isOpen);

  return (
    <DrawerRoot>
      <DrawerTogglerBtn
        onClick={() => dispatch(actions.toggleDrawer())}
        color="inherit"
        size="small"
      >
        <Menu fontSize="large" />
      </DrawerTogglerBtn>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={() => dispatch(actions.toggleDrawer())}
        onOpen={() => dispatch(actions.toggleDrawer())}
      >
        <DrawerBody />
      </SwipeableDrawer>
    </DrawerRoot>
  );
};

export default Drawer;
