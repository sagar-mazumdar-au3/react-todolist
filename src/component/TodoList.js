import React from 'react';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import {
  selectStore,
} from '../redux/todoSlice';
import TodoListItem from './TodoListItem';

export default function TodoList() {
  const store = useSelector(selectStore);

  return (
    <List dense sx={{ width: '100%' }}>
      {store?.todoList?.map((todo) => {
        return (
          <TodoListItem key={todo?.id} {...todo} />
        );
      })}
    </List>
  );
}