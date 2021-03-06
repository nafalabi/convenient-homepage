import React, { useCallback } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { useState } from "react";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import InputWithConfirmation from "../../../components/InputWithConfirmation";
import { db } from "../../../app/storage/Dexie";

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
