import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedTodoId: 0,
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
