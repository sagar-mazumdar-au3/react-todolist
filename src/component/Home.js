import React from "react";
import Container from '@mui/material/Container';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const Home = () => {

  return (
    <Container component="main" maxWidth="xs">
      <h2 align="center">Todo List</h2>
      <AddTodo />
      <TodoList />
    </Container >
  )
};

export default Home;