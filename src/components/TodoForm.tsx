import { useId, useState } from 'react';
import type { FormEvent } from 'react';

type TodoFormProps = {
  onAdd: (title: string) => void;
};

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const inputId = useId();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        할 일 입력
      </label>
      <input
        id={inputId}
        type="text"
        className="todo-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default TodoForm;
