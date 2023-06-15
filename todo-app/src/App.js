import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
