import { useEffect, useReducer, useState } from 'react';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import type { Todo, TodoFilter } from '@/types/todo';
import FilterBar from '@/components/FilterBar';
import { todosReducer } from '@/reducers/todosReducer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Button from '@/components/ui/Button';
import styles from './App.module.css';

// 가데이터
const initialTodos: Todo[] = [
  { id: '1', title: 'React 커리큘럼 0단계 끝내기', done: true, priority: 'low' },
  { id: '2', title: 'JSX가 HTML과 뭐가 다른지 설명해보기', done: false, priority: 'high' },
  { id: '3', title: 'props 타입 직접 하나 추가해보기', done: false, priority: 'low' },
];

const STORAGE_KEY = 'taskly.todos';

const init = (fallback: Todo[]): Todo[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return fallback;

  try {
    return JSON.parse(saved) as Todo[];
  }
  catch {
    return fallback;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos, init);
  const [filter, setFilter] = useLocalStorage<TodoFilter>('taskly.filter', 'all');
  const [keyword, setKeyword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // 파생 값 — 상태로 두지 않고 매 렌더마다 계산한다
  const doneCount = todos.filter(todo => todo.done).length;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const visibleTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.done;
      if (filter === 'done') return todo.done;
      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(normalizedKeyword));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (title: string) => {
    dispatch({ type: 'added', id: crypto.randomUUID(), title });
  };

  const handleToggle = (id: string) => {
    dispatch({ type: 'toggled', id });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleted', id });
  };

  const handleEditSubmit = (id: string, title: string) => {
    dispatch({ type: 'edited', id, title });
    setEditingId(null);
  };

  const handleClearDone = () => {
    dispatch({ type: 'clearedDone' });
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>
          <h1>Taskly</h1>
          <p className={styles.subtitle}>
            할 일 {todos.length}개 · 완료 {doneCount}개
          </p>
        </div>
        {doneCount > 0 && (
          <Button variant="secondary" size="sm" onClick={handleClearDone}>
            완료 삭제
          </Button>
        )}
      </header>
      <TodoForm onAdd={handleAdd} />

      <FilterBar
        filter={filter}
        keyword={keyword}
        onFilterChange={setFilter}
        onKeywordChange={setKeyword}
      />

      <TodoList
        todos={visibleTodos}
        editingId={editingId}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEditStart={setEditingId}
        onEditSubmit={handleEditSubmit}
        onEditCancel={() => setEditingId(null)}
      />
    </div>
  );
};

export default App;
