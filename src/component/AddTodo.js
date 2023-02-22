import React, { useState, useCallback, useMemo } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  clearCompletedTodo,
  selectStore
} from '../redux/todoSlice';
import { isCompletedExist } from '../appConstants/constant'

export default function AddTodo() {
  const dispatch = useDispatch();
  const store = useSelector(selectStore);
  const isCompletedExi = useMemo(() => isCompletedExist(store?.todoList), [store?.todoList]);
  const [error, setError] = useState({ todo: '' });

  const errorCheck = useCallback((formData) => {
    let isError = false;
    // Empty check
    if (!formData?.get('todo')) {
      setError(error => { return { ...error, todo: "Todo title can't be empty" } });
      isError = true;
    }
    // Length check
    else if (formData?.get('todo')?.length < 3) {
      setError(error => { return { ...error, todo: "Todo title can't be less than 3 characters" } });
      isError = true;
    }
    // Check passed removed error
    else {
      setError(error => { return { ...error, todo: "" } });
      isError = false;

    }

    return isError;
  }, [])

  const handleSubmit = useCallback((event) => {
    event?.preventDefault();
    const data = new FormData(event?.currentTarget);
    const isError = errorCheck(data);

    if (!isError) {
      dispatch(addTodo(data?.get('todo')));

      // Clearing input
      event.currentTarget[0].value = ""
    }
  }, [dispatch, errorCheck])

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container >
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="todo"
                label="Enter Todo title here..."
                name="todo"
                autoFocus
                error={!!error.todo}
                helperText={error.todo}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                + Add Todo
              </Button>
            </Grid>
          </Grid>
          {isCompletedExi && <Grid container justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                sx={{ mb: 1, mt: 2 }}
                startIcon={<DeleteIcon />}
                size="small"
                color='error'
                onClick={() => dispatch(clearCompletedTodo())}
              >
                Clear Completed
              </Button>
            </Grid>
          </Grid>}


        </Box>
      </Box>
    </>
  );
}