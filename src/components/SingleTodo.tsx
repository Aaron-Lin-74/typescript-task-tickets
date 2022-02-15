import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../models/models';
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';
import { MdDownloadDone } from 'react-icons/md';
import './style.css';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  // The content of the todo list that is being edited.
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEditMode(false);
  };

  // Set the selected todo to done status.
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Delete the selected todo
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Focus the input when click edit
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  return (
    <form className='todo__single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {editMode ? (
        <input
          value={editTodo}
          ref={inputRef}
          onChange={(e) => setEditTodo(e.target.value)}
          className='todo__single--text'
        />
      ) : todo.isDone ? (
        <s className='todo__single--text'>{todo.todo}</s>
      ) : (
        <span className='todo__single--text'>{todo.todo}</span>
      )}

      <div>
        <span
          className='icon'
          onClick={() => {
            if (!editMode && !todo.isDone) {
              setEditMode(!editMode);
            }
          }}
        >
          <RiEdit2Fill />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <RiDeleteBin2Fill />
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <MdDownloadDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
