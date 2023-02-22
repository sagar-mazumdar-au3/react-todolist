import React, { useRef, useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import {
  updateTodoStatusById,
  updateTodoEditStatusById,
  updateTodoNameById
} from '../redux/todoSlice';

export default function TodoListItem({ id, isCompleated, isEdit, name }) {
  const dispatch = useDispatch();
  const itemRef = useRef(null);

  const handleCheckbox = useCallback((id) => {
    dispatch(updateTodoStatusById(id));
  }, [dispatch])

  const handleDoubleClick = useCallback((id) => {
    dispatch(updateTodoEditStatusById(id));
    setTimeout(() => {
      itemRef?.current?.focus()
    })
  }, [dispatch])

  const handleOnBlur = useCallback((id, e) => {
    dispatch(updateTodoNameById({ id, newName: e?.target?.innerText }));
  }, [dispatch])

  return (
    <ListItem
      key={id}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={() => { handleCheckbox(id) }}
          checked={isCompleated}
          inputProps={{ 'aria-labelledby': id }}
        />
      }
      disablePadding
      sx={{ mb: 1, bgcolor: '#eeeeee' }}
    >
      <ListItemButton onDoubleClick={() => { handleDoubleClick(id) }}>
        <ListItemText onBlur={(e) => { handleOnBlur(id, e) }} contentEditable={isEdit} suppressContentEditableWarning={true} ref={itemRef} id={id} primary={name} />
      </ListItemButton>
    </ListItem>
  );
}