import React from 'react';
import SingleTodo from './SingleTodo';
import './style.css';
import { useGlobalContext } from '../contexts/AppContext';

const TodoList = () => {
  const { state } = useGlobalContext();
  return (
    <div className='todos'>
      {state.todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoList;
