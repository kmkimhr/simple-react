import type { Todo } from '@/types/todo';

// case 문 내부에서 필드 강제 가능
export type TodoAction
  = | { type: 'added'; id: string; title: string }
    | { type: 'toggled'; id: string }
    | { type: 'deleted'; id: string }
    | { type: 'edited'; id: string; title: string }
    | { type: 'clearedDone' };

export const todosReducer = (todos: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'added':
      return [
        ...todos,
        { id: action.id, title: action.title, done: false, priority: 'low' },
      ];

    case 'toggled':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );

    case 'deleted':
      return todos.filter(todo => todo.id !== action.id);

    case 'edited':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, title: action.title } : todo,
      );

    case 'clearedDone':
      return todos.filter(todo => !todo.done);
  }
};
