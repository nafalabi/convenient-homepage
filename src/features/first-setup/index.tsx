import React, { useEffect, useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Box, styled } from "@mui/system";
import { IconButton, Paper, TextField, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

import { actions as homepageActions } from "features/homepage/slice";
import { actions as settingsActions } from "features/settings/slice";

import forestBackground from "./forest_background.svg";

const RootDiv = styled("div")({
  display: "flex",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#00000085",
  zIndex: 9000,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  opacity: 0,
  transition: "opacity 0.5s ease-out 0s",
  "&.show": {
    opacity: 1,
  },
});

const FirstSetupScreen = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  // for the animations
  useEffect(() => {
    setTimeout(() => setShow(true), 0);
  }, []);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(settingsActions.setUserName(name));
    setShow(false);
    setTimeout(() => dispatch(homepageActions.setAlreadySetup()), 1000);
  };

  return (
    <RootDiv className={show ? "show" : ""}>
      <Paper
        elevation={3}
        sx={{
          p: 7,
          backgroundImage: `url(${forestBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundColor: "#eee",
        }}
      >
        <form onSubmit={onSubmit}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          >
            Welcome
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Thanks for using Convenient Home
          </Typography>
          <Typography sx={{ mb: 2, textAlign: "center" }}>
            What is your name?
          </Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              autoFocus
              variant="standard"
              fullWidth
              sx={{ "& input": { textAlign: "center" } }}
              onChange={(e) => setName(e.target.value)}
            />
            <IconButton sx={{ mr: -3 }} type="submit">
              <ArrowForward
                sx={(theme) => ({
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                })}
              />
            </IconButton>
          </Box>
        </form>
      </Paper>
    </RootDiv>
  );
};

export default FirstSetupScreen;
