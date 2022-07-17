import React from "react";
import { actions } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import DrawerBody from "./DrawerBody";
import { styled, SwipeableDrawer } from "@mui/material";
import useModalRouteAction from "hooks/useModalRouteAction";
import { useNavigate } from "react-router-dom";

const DrawerRoot = styled("div")({});

const Drawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(({ drawer }) => drawer.isOpen);

  const handleOpen = () => navigate("/drawer");

  const { handleClose } = useModalRouteAction({
    open: () => dispatch(actions.setOpen(true)),
    close: () => {
      dispatch(actions.setOpen(false));
    },
  });

  return (
    <DrawerRoot>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <DrawerBody />
      </SwipeableDrawer>
    </DrawerRoot>
  );
};

export default Drawer;
