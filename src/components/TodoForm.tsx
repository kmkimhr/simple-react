import { useId } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './TodoForm.module.css';

type TodoFormProps = {
  onAdd: (title: string) => void;
};

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const inputId = useId();

  const handleAction = (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim();
    if (!title) return;
    onAdd(title);
  };

  return (
    <form className={styles.form} action={handleAction}>
      <label htmlFor={inputId} className="sr-only">
        할 일 입력
      </label>
      <Input
        id={inputId}
        name="title"
        type="text"
        className={styles.input}
        placeholder="할 일을 입력하세요"
      />
      <Button type="submit">추가</Button>
    </form>
  );
};

export default TodoForm;
