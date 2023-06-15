import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { removeTodo, toggleTodo, reorderTodo } from './todoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(removeTodo(id));
  };

  const handleToggle = id => {
    dispatch(toggleTodo(id));
  };

  const handleDragEnd = result => {
    if (!result.destination) return;

    dispatch(
      reorderTodo({
        startIndex: result.source.index,
        endIndex: result.destination.index
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            priority={todo.priority}
            index={index}
            handleRemove={handleRemove}
            handleToggle={handleToggle}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </ul>
    </DndProvider>
  );
};

const TodoItem = ({
  id,
  text,
  completed,
  priority,
  index,
  handleRemove,
  handleToggle,
  handleDragEnd
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TODO_ITEM',
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TODO_ITEM',
    hover: item => {
      if (item.index !== index) {
        handleDragEnd(item);
      }
    }
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <li ref={node => drag(drop(node))} style={{ opacity }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleToggle(id)}
      />
      <span>{text}</span>
      <button onClick={() => handleRemove(id)}>Remove</button>
    </li>
  );
};

export default TodoList;
