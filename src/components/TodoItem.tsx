import type { Todo } from '@/types/todo';
import TodoEditForm from '@/components/TodoEditForm';

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
  onEditSubmit: (id: string, title: string) => void;
  onEditCancel: () => void;
};

const TodoItem = ({
  todo, isEditing, onToggle, onDelete, onStartEdit, onEditSubmit, onEditCancel,
}: TodoItemProps) => {
  if (isEditing) {
    return (
      <li className="todo-item">
        <TodoEditForm
          initialTitle={todo.title}
          onSubmit={title => onEditSubmit(todo.id, title)}
          onCancel={onEditCancel}
        />
      </li>
    );
  }

  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span
        className={todo.done ? 'todo-title done' : 'todo-title'}
        onDoubleClick={() => onStartEdit(todo.id)}
      >
        {todo.title} {todo.priority === 'high' && '🔥'}
      </span>
      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.title} 삭제`}
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;
