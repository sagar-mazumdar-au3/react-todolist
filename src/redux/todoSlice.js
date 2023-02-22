import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [], // { name: "Todo 1", isCompleated: false, isEdit: false, id: 123 }
};

export const todoSlice = createSlice({
  name: 'todoStore',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.unshift({ name: action?.payload, isCompleated: false, id: new Date().valueOf() })
    },
    updateTodoStatusById: (state, action) => {
      state?.todoList?.forEach((item, i) => {
        if (item?.id === action?.payload) {
          state.todoList[i].isCompleated = !state?.todoList[i]?.isCompleated;
        }
      })
    },
    updateTodoEditStatusById: (state, action) => {
      state?.todoList?.forEach((item, i) => {
        if (item?.id === action?.payload) {
          state.todoList[i].isEdit = !state?.todoList[i]?.isEdit;
        }
      })
    },
    updateTodoNameById: (state, action) => {
      state?.todoList?.forEach((item, i) => {
        if (item?.id === action?.payload?.id) {
          state.todoList[i].name = action?.payload?.newName;
          state.todoList[i].isEdit = false;
        }
      })
    },
    clearCompletedTodo: (state) => {
      const tempTodoList = state?.todoList?.filter((item) => {
        return !item?.isCompleated;
      });
      state.todoList = tempTodoList;
    },
  }
});

export const { addTodo, updateTodoStatusById, updateTodoNameById, clearCompletedTodo, updateTodoEditStatusById } = todoSlice?.actions;

export const selectStore = (state) => state?.todoStore;

export default todoSlice?.reducer;
