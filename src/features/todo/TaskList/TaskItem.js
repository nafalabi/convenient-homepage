import React, { useCallback } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import InputWithConfirmation from "../../../components/InputWithConfirmation";
import db from "../../../app/storage/dexie/db";

const TaskItem = ({ task }) => {
  const [isEditMode, setEditMode] = useState(false);
  const toggleCompleteTask = useCallback(() => {
    task.toggleComplete();
  }, [task]);
  const deleteTask = useCallback(() => {
    db.task.delete(task.taskid);
  }, [task]);

  if (isEditMode)
    return (
      <ListItem disableGutters>
        <ListItemIcon></ListItemIcon>
        <InputWithConfirmation
          onConfirm={(value) => {
            task.name = value;
            task.save();
            setEditMode(false);
          }}
          onCancel={() => {
            setEditMode(false);
          }}
          onBlur={() => {
            setEditMode(false);
          }}
          inputProps={{ style: { fontSize: 14 } }}
          defaultValue={task.name}
          autoFocus
        />
        <ListItemSecondaryAction />
      </ListItem>
    );

  return (
    <ListItem disableGutters>
      <ListItemIcon>
        <IconButton size="small" onClick={toggleCompleteTask}>
          {task.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
      </ListItemIcon>
      <ListItemText onClick={() => setEditMode(true)}>{task.name}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton size="small" onClick={deleteTask}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
