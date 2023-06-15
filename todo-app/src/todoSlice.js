import { createSlice } from '@reduxjs/toolkit';

const initialTodos = [
  { id: '1', text: 'Task 1', completed: false, priority: 'low' },
  { id: '2', text: 'Task 2', completed: false, priority: 'medium' },
  { id: '3', text: 'Task 3', completed: true, priority: 'high' }
];

const todoSlice = createSlice({
  name: 'todos',
  initialState: initialTodos,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    reorderTodo: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.splice(startIndex, 1);
      state.splice(endIndex, 0, removed);
    },
    setPriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.priority = priority;
      }
    }
  }
});

export const { addTodo, removeTodo, toggleTodo, reorderTodo, setPriority } = todoSlice.actions;
export default todoSlice.reducer;
