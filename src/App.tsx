import { useState } from 'react';
import type { Todo } from '@/types/todo';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';

// 가데이터
const initialTodos: Todo[] = [
  { id: '1', title: 'React 커리큘럼 0단계 끝내기', done: true, priority: 'low' },
  { id: '2', title: 'JSX가 HTML과 뭐가 다른지 설명해보기', done: false, priority: 'high' },
  { id: '3', title: 'props 타입 직접 하나 추가해보기', done: false, priority: 'low' },
];

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // 파생 값 — 상태로 두지 않고 매 렌더마다 계산한다
  const doneCount = todos.filter(todo => todo.done).length;

  const handleToggle = (id: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleAdd = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      done: false,
      priority: 'low',
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const handleClearDone = () => {
    setTodos(prev => prev.filter(todo => !todo.done));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Taskly</h1>
          <p className="app-subtitle">
            할 일 {todos.length}개 · 완료 {doneCount}개
          </p>
        </div>
        {doneCount > 0 && (
          <button type="button" className="clear-done" onClick={handleClearDone}>
            완료 삭제
          </button>
        )}
      </header>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
};

export default App;
