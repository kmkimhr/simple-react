import { useId } from 'react';

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
    <form className="todo-form" action={handleAction}>
      <label htmlFor={inputId} className="sr-only">할 일 입력</label>
      <input
        id={inputId}
        name="title"
        type="text"
        className="todo-input"
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
    </form>
  );
};

export default TodoForm;
