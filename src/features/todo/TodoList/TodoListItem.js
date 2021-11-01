import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import ListIcon from "@mui/icons-material/List";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";
import { Delete } from "@mui/icons-material";
import db from "../../../app/storage/dexie/db";

const useStyle = makeStyles({
  containerListItem: {
    "&:hover .delete-action": {
      opacity: 1,
    },
    "& .delete-action": {
      opacity: 0,
    },
  },
});

const TodoListItem = ({ name, todoid }) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const selectedTodoId = useSelector(selectors.selectedTodoId);

  const deleteTodoList = React.useCallback(
    (todoid) => async () => {
      // If the todo list is currently selected, select another
      if (todoid === selectedTodoId) dispatch(actions.selectTodo(0));
      // Proceed the deletion
      const ids = await db.task.where({ todoid }).primaryKeys();
      await db.task.bulkDelete(ids);
      await db.todo.delete(todoid);
    },
    [dispatch, selectedTodoId]
  );

  return (
    <ListItem
      button
      onClick={() => dispatch(actions.selectTodo(todoid))}
      classes={{ container: classes.containerListItem }}
      selected={todoid === selectedTodoId}
    >
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          style: { overflow: "hidden", textOverflow: "ellipsis" },
        }}
      >
        {name}
      </ListItemText>
      <ListItemSecondaryAction className="delete-action">
        <IconButton size="small" onClick={deleteTodoList(todoid)}>
          <Delete fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
