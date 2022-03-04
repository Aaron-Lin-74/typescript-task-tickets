import React, { createContext, useContext, useReducer } from 'react';
import { Todo } from '../models/models';

// Define the type for default state of useContext
interface InitialStateType {
  todos: Todo[];
}

// Set the initial state of the useContext
const initialState: InitialStateType = {
  todos: [],
};

// A string enum with all the types of actions to use in our reducer
export enum TodoActionKind {
  Add = 'ADD',
  Edit = 'EDIT',
  Remove = 'REMOVE',
  Done = 'DONE',
}

// Defined action object type
type Action =
  | { type: TodoActionKind.Add; payload: { todo: string } }
  | { type: TodoActionKind.Edit; payload: { todo: string; id: number } }
  | { type: TodoActionKind.Remove; payload: { id: number } }
  | { type: TodoActionKind.Done; payload: { id: number } };

const todoReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case TodoActionKind.Add:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), todo: action.payload.todo, isDone: false },
        ],
      };
    case TodoActionKind.Edit:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, todo: action.payload.todo }
            : todo
        ),
      };
    case TodoActionKind.Remove:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TodoActionKind.Done:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isDone: !todo.isDone }
            : todo
        ),
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
