import React, { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import UserDetails from "./UserDetail";
import { useDispatch } from "react-redux";
import { actions } from "../../slice";

const General = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchGeneralSettings());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h5">General Settings</Typography>
      <Box mt={1} mb={2}>
        <Divider />
      </Box>
      <UserDetails />
    </Box>
  );
};

export default General;
