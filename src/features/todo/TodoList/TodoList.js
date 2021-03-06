import React from "react";
import { Box, List, ListItem } from "@material-ui/core";
import useSubscribeTodoList from "../hooks/useSubscribeTodoList";
import InputWithConfirmation from "../../../components/InputWithConfirmation";
import { Todo } from "../../../app/storage/Dexie";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todoList = useSubscribeTodoList();

  return (
    <Box>
      <List dense>
        {todoList.map((todoItem, index) => (
          <TodoListItem {...todoItem} key={"todo-list-" + index} />
        ))}
        <ListItem>
          <InputWithConfirmation
            onConfirm={(value) => {
              const newTodoList = new Todo();
              newTodoList.name = value;
              newTodoList.save();
            }}
            inputProps={{ style: { fontSize: 13 } }}
            placeholder="Add New List"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default TodoList;
