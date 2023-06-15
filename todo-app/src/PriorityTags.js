import React from 'react';
import { useDispatch } from 'react-redux';
import { setPriority } from './todoSlice';

const PriorityTags = ({ todoId }) => {
  const dispatch = useDispatch();

  const handlePriorityChange = e => {
    dispatch(setPriority({ id: todoId, priority: e.target.value }));
  };

  return (
    <select onChange={handlePriorityChange}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};

export default PriorityTags;
