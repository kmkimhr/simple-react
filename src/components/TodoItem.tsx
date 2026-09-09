import type { Todo } from '../types/todo'

type TodoItemProps = {
  todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="todo-item">
      <input type="checkbox" checked={todo.done} readOnly />
      <span className={todo.done ? 'todo-title done' : 'todo-title'}>
        {todo.title}
      </span>
    </li>
  )
}

export default TodoItem
