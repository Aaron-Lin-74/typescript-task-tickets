import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../models/models';
import { RiEdit2Fill, RiDeleteBin2Fill } from 'react-icons/ri';
import { MdDownloadDone } from 'react-icons/md';
import { useGlobalContext, TodoActionKind } from '../contexts/AppContext';
import './style.css';

const SingleTodo = ({ todo }: { todo: Todo }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { dispatch } = useGlobalContext();

  // The content of the todo list that is being edited.
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    dispatch({ type: TodoActionKind.Edit, payload: { id, todo: editTodo } });
    setEditMode(false);
  };

  // Set the selected todo to done status.
  const handleDone = (id: number) => {
    dispatch({ type: TodoActionKind.Done, payload: { id } });
  };

  // Delete the selected todo
  const handleDelete = (id: number) => {
    dispatch({ type: TodoActionKind.Remove, payload: { id } });
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
