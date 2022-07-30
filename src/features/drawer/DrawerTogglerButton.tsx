import React from "react";
import { Menu } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isImageLoaded",
})(({ opacity }: { opacity: number }) => ({
  opacity: opacity,
  transition: "opacity 0.5s ease 0.5s",
  position: "fixed",
  top: "0.5rem",
  left: "1rem",
  color: "#ffffffad",
  "&:hover": {
    color: "#fff",
  },
}));

const DrawerTogglerButton = (props: { isImageLoaded: boolean }) => {
  const navigate = useNavigate();
  const handleOpen = () => navigate("/drawer");

  return (
    <StyledIconButton
      onClick={handleOpen}
      color="inherit"
      size="small"
      opacity={Number(props.isImageLoaded)}
    >
      <Menu fontSize="large" />
    </StyledIconButton>
  );
};

export default DrawerTogglerButton;
