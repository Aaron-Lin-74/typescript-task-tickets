import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { useGlobalContext } from './contexts/AppContext';

const App: React.FC = () => {
  const { todos, setTodos } = useGlobalContext();
  const [todo, setTodo] = useState<string>('');
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo('');
    }
  };
  return (
    <div className='App'>
      <span className='heading'>Tasks</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList />
    </div>
  );
};

export default App;
