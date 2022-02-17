import React, { createContext, useContext, useState } from 'react';
import { Todo } from '../models/models';

// Define the type for default state of useContext
interface GlobalContent {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// Set the initial state of the useContext
const initialState: GlobalContent = {
  todos: [],
  setTodos: () => {},
};

const AppContext = createContext<typeof initialState>(initialState);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <AppContext.Provider value={{ todos, setTodos }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
