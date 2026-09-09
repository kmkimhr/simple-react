import type { Todo } from '../types/todo'

type TodoItemProps = {
  todo: Todo,
  onToggle: (id: string) => void
}

function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span className={todo.done ? 'todo-title done' : 'todo-title'}>
        {todo.title} {todo.priority === 'high' && '🔥'}
      </span>
    </li>
  )
}

export default TodoItem
