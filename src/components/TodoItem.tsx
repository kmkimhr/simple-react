import type { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.done ? 'todo-title done' : 'todo-title'}>
        {todo.title} {todo.priority === 'high' && '🔥'}
      </span>
      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.title} 삭제`}
      >x</button>
    </li>
  );
};

export default TodoItem;
