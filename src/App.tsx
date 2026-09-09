import { useEffect, useReducer, useRef, useState } from 'react';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';
import type { Todo, TodoFilter } from '@/types/todo';
import FilterBar from '@/components/FilterBar';
import type { FilterBarHandle } from '@/components/FilterBar';
import { todosReducer } from '@/reducers/todosReducer';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Button from '@/components/ui/Button';
import styles from './App.module.css';
import Modal from '@/components/ui/Modal';

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
  const filterBarRef = useRef<FilterBarHandle>(null);

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

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const pendingTodo = todos.find(todo => todo.id === pendingDeleteId) ?? null;

  const handleDeleteRequest = (id: string) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = () => {
    if (pendingDeleteId) dispatch({ type: 'deleted', id: pendingDeleteId });
    setPendingDeleteId(null);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // "/" 를 누르면 검색창으로 포커스 이동
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '/') return;
      if (e.target instanceof HTMLInputElement) return; // 입력 중이면 무시

      e.preventDefault();
      filterBarRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdd = (title: string) => {
    dispatch({ type: 'added', id: crypto.randomUUID(), title });
  };

  const handleToggle = (id: string) => {
    dispatch({ type: 'toggled', id });
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
        ref={filterBarRef}
        filter={filter}
        keyword={keyword}
        onFilterChange={setFilter}
        onKeywordChange={setKeyword}
      />

      <TodoList
        todos={visibleTodos}
        editingId={editingId}
        onToggle={handleToggle}
        onDelete={handleDeleteRequest}
        onEditStart={setEditingId}
        onEditSubmit={handleEditSubmit}
        onEditCancel={() => setEditingId(null)}
      />
      <Modal
        isOpen={pendingTodo !== null}
        title="할 일 삭제"
        onClose={() => setPendingDeleteId(null)}
      >
        <p className={styles.modalBody}>
          "{pendingTodo?.title}"을(를) 삭제할까요?
        </p>
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setPendingDeleteId(null)}>
            취소
          </Button>
          <Button onClick={handleDeleteConfirm}>삭제</Button>
        </div>
      </Modal>
    </div>

  );
};

export default App;
