import { useState } from 'react';
import type { FormEvent } from 'react';

type TodoEditFormProps = {
  initialTitle: string;
  onSubmit: (title: string) => void;
  onCancel: () => void;
};

const TodoEditForm = ({ initialTitle, onSubmit, onCancel }: TodoEditFormProps) => {
  const [draft, setDraft] = useState(initialTitle);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        autoFocus
      />
      <button type="submit">저장</button>
      <button type="button" onClick={onCancel}>
        취소
      </button>
    </form>
  );
};

export default TodoEditForm;