import type { Todo } from '@/types/todo';
import TodoEditForm from '@/components/TodoEditForm';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEditStart: (id: string) => void;
  onEditSubmit: (id: string, title: string) => void;
  onEditCancel: () => void;
};

const TodoItem = ({
  todo,
  isEditing,
  onToggle,
  onDelete,
  onEditStart,
  onEditSubmit,
  onEditCancel,
}: TodoItemProps) => {
  if (isEditing) {
    return (
      <li className={styles.item}>
        <TodoEditForm
          initialTitle={todo.title}
          onSubmit={title => onEditSubmit(todo.id, title)}
          onCancel={onEditCancel}
        />
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={cn(styles.title, todo.done && styles.done)}
        onDoubleClick={() => onEditStart(todo.id)}
      >
        {todo.title} {todo.priority === 'high' && '🔥'}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className={styles.delete}
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.title} 삭제`}
      >
        ×
      </Button>
    </li>
  );
};

export default TodoItem;
