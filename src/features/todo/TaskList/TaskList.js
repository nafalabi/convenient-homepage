import { Box, Grid, List, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../slice.js";
import useSubscribeTaskList from "../hooks/useSubscribeTaskList";
import TaskItem from "./TaskItem";
import TaskAdd from "./TaskAdd.js";
import TaskListHome from "./TaskListHome.js";

const TodoEditor = () => {
  const todoid = useSelector(selectors.selectedTodoId);
  const queryResult = useSubscribeTaskList({ todoid });

  if (!queryResult) return <TaskListHome />;

  const { todo, tasks } = queryResult;

  const updateListName = (e) => {
    const { value } = e.target;
    if (!value) return;
    todo.name = value;
    todo.save();
  };

  return (
    <Box>
      <Grid>
        <TextField
          fullWidth
          label="List Name"
          defaultValue={todo.name}
          key={todo.name}
          onBlur={updateListName}
          onKeyDown={(e) => {
            e.stopPropagation();
            switch (e.key) {
              case "Enter":
                updateListName(e);
                break;
              case "Escape":
                e.target.value = todo.name;
                e.target.blur();
                break;
              default:
                break;
            }
          }}
        />
      </Grid>
      <Grid>
        <List dense>
          {tasks.map((task, index) => (
            <TaskItem task={task} key={`task-${index}`} />
          ))}
          <TaskAdd />
        </List>
      </Grid>
    </Box>
  );
};

export default TodoEditor;
