import React from "react";
import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const StyledIconButton = withStyles({
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

const DrawerTogglerButton = () => {
  const navigate = useNavigate();
  const handleOpen = () => navigate("/drawer");

  return (
    <StyledIconButton onClick={handleOpen} color="inherit" size="small">
      <Menu fontSize="large" />
    </StyledIconButton>
  );
};

export default DrawerTogglerButton;
