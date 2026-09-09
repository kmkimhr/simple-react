import type { Todo } from '@/types/todo'
import TodoList from '@/components/TodoList'

// 가데이터
const initialTodos: Todo[] = [
  { id: '1', title: 'React 커리큘럼 0단계 끝내기', done: true },
  { id: '2', title: 'JSX가 HTML과 뭐가 다른지 설명해보기', done: false },
  { id: '3', title: 'props 타입 직접 하나 추가해보기', done: false },
]

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Taskly</h1>
        <p className="app-subtitle">할 일 {initialTodos.length}개</p>
      </header>
      <TodoList todos={initialTodos} />
    </div>
  )
}

export default App