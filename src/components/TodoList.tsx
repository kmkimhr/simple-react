import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

type TodoListProps = {
  todos: Todo[];
  editingId: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEditStart: (id: string) => void;
  onEditSubmit: (id: string, title: string) => void;
  onEditCancel: () => void;
};

const TodoList = ({
  todos,
  editingId,
  onToggle,
  onDelete,
  onEditStart,
  onEditSubmit,
  onEditCancel,
}: TodoListProps) => {
  if (todos.length === 0) {
    return <p className={styles.empty}>할일이 없습니다. 추가해주세요</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={todo.id === editingId}
          onToggle={onToggle}
          onDelete={onDelete}
          onEditStart={onEditStart}
          onEditSubmit={onEditSubmit}
          onEditCancel={onEditCancel}
        />
      ))}
    </ul>
  );
};

export default TodoList;
