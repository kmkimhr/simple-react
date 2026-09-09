import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './TodoEditForm.module.css';

type TodoEditFormProps = {
  initialTitle: string;
  onSubmit: (title: string) => void;
  onCancel: () => void;
};

const TodoEditForm = ({
  initialTitle,
  onSubmit,
  onCancel,
}: TodoEditFormProps) => {
  const [draft, setDraft] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={draft}
        onChange={e => setDraft(e.target.value)}
      />
      <Button type="submit" size="sm">
        저장
      </Button>
      <Button variant="secondary" size="sm" onClick={onCancel}>
        취소
      </Button>
    </form>
  );
};

export default TodoEditForm;
