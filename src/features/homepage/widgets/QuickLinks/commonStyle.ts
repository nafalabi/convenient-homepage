import { Theme } from "@mui/material";

const commonStyle = (theme: Theme): any => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80px",
  padding: "8px",
  background: "transparent",
  borderRadius: "8px",
  textTransform: "none",
  color: "rgba(255,255,255,0.7)",
  justifyContent: "flex-start",
  transition: "all 0.5s ease",
  cursor: "pointer",

  "&:hover": {
    background: "#eeeeee57",
    color: "white",

    "& .icon": {
      background: "white",
    },
  },

  "& .icon": {
    width: "32px",
    height: "32px",
    padding: "4px",
    background: "rgba(255,255,255,0.7)",
    borderRadius: "100%",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    transition: "all 0.5s ease",
  },

  "& .name": {
    width: "100%",
    fontSize: "12px",
    textAlign: "center",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
    overflow: "hidden",
    marginTop: "8px",
    lineHeight: 1.2,
  },
});

export default commonStyle;
