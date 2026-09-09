import { useState } from 'react';
import type { FormEvent } from 'react';

type TodoFormProps = {
  onAdd: (title: string) => void;
};

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('');

  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handelSubmit}>
      <input
        type="text"
        className="todo-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="할일 입력"
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default TodoForm;
