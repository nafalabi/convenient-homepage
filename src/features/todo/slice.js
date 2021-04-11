import { createSlice } from "@reduxjs/toolkit";
import localData from "../../app/storage/localData";

const initialState = {
  isOpen: false,
  selectedTodoId: Number(localData.selectedTodoId()) || 0,
};

export const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleTodo: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectTodo: (state, { payload: todoId }) => {
      state.selectedTodoId = todoId;
      localData.selectedTodoId(todoId);
    },
  },
});

export const actions = {
  ...slice.actions,
};

export const selectors = {
  isOpen: ({ todo }) => todo.isOpen,
  selectedTodoId: ({ todo }) => todo.selectedTodoId,
};

export default slice.reducer;
