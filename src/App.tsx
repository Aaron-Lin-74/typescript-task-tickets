import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { useGlobalContext, TodoActionKind } from './contexts/AppContext';
import Heading from './components/Heading';

const App = () => {
  const { dispatch } = useGlobalContext();
  const [todo, setTodo] = useState<string>('');
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: TodoActionKind.Add, payload: { todo } });
      setTodo('');
    }
  };
  return (
    <div className='App'>
      <Heading>
        <h1>Hi, this is the task ticket application.</h1>
      </Heading>
      <span className='heading'>Tasks</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList />
    </div>
  );
};

export default App;
