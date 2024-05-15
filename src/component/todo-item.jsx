import React from 'react';

const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      
      <button onClick={() => removeTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
