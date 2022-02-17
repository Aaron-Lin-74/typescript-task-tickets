import React from 'react';
import SingleTodo from './SingleTodo';
import './style.css';
import { useGlobalContext } from '../contexts/AppContext';

const TodoList = () => {
  const { todos } = useGlobalContext();
  return (
    <div className='todos'>
      {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
