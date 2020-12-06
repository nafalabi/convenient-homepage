import React from "react";
import { actions, selectors } from "./slice";
import { useSelector, useDispatch } from "react-redux";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import TodoList from "./TodoList/TodoList";
import TaskList from "./TaskList/TaskList";

const Todo = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.isOpen);

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleTodo())}
      title="Todo List"
      SidebarComponent={() => <TodoList />}
      ContentComponent={() => <TaskList />}
    />
  );
};

export default Todo;
