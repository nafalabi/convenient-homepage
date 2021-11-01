import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Add } from "@mui/icons-material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Task from "../../../app/storage/dexie/Task";
import InputWithConfirmation from "../../../components/InputWithConfirmation";
import { selectors } from "../slice";

const TaskAdd = ({ active }) => {
  const [isActive, setActive] = useState(active);
  const selectedTodoId = useSelector(selectors.selectedTodoId);
  const addNewTask = useCallback(
    (value) => {
      const newTask = new Task(selectedTodoId);
      newTask.name = value;
      newTask.save();
    },
    [selectedTodoId]
  );

  if (isActive)
    return (
      <ListItem disableGutters>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <InputWithConfirmation
          onConfirm={addNewTask}
          onCancel={() => setActive(false)}
          onBlur={() => setActive(false)}
          placeholder="Add New Task"
          inputProps={{ style: { fontSize: 14 } }}
          autoFocus
        />
      </ListItem>
    );

  return (
    <ListItem disableGutters onClick={() => setActive(true)}>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText>Add New Task</ListItemText>
    </ListItem>
  );
};

export default TaskAdd;
