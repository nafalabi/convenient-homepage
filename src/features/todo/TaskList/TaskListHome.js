import { Box, Typography } from "@mui/material";
import React from "react";

const TaskListHome = () => {
  return (
    <Box maxWidth="600px">
      <Typography variant="h4">Welcome</Typography>
      <Typography variant="subtitle1">
        This is the homepage of Todo List.
      </Typography>
      <Typography variant="body2">
        If there's no todo list selected, you will be seeing this page.
      </Typography>
      <Typography variant="body2">
        If you are new and don't have any todo list yet, don't worry you can
        create it on the left side of this section.
      </Typography>
    </Box>
  );
};

export default TaskListHome;
