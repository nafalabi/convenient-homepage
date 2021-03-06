import { Box, Button, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "./slice";

const NoteCouldntLoad = () => {
  const dispatch = useDispatch();
  const backToHome = () => dispatch(actions.selectNote(0));

  return (
    <Box maxWidth="600px">
      <Box width="100%">
        <Typography variant="h4">Error Happened</Typography>
        <Typography variant="subtitle1">Couldn't load the note</Typography>
      </Box>
      <Box mt={1}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Home />}
          onClick={backToHome}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NoteCouldntLoad;
