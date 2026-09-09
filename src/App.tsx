import { useState } from 'react'
import type { Todo } from '@/types/todo'
import TodoList from '@/components/TodoList'

// 가데이터
const initialTodos: Todo[] = [
  { id: '1', title: 'React 커리큘럼 0단계 끝내기', done: true, priority: 'low' },
  { id: '2', title: 'JSX가 HTML과 뭐가 다른지 설명해보기', done: false, priority: 'high' },
  { id: '3', title: 'props 타입 직접 하나 추가해보기', done: false, priority: 'low' },
]

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Taskly</h1>
        <p className="app-subtitle">할 일 {todos.length}개</p>
      </header>
      <TodoList todos={todos} onToggle={handleToggle} />
    </div>
  )
}

export default App
