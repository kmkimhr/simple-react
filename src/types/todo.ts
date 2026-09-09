export type Todo = {
  id: string;
  title: string;
  done: boolean;
  priority: 'low' | 'high';
};

export type TodoFilter = 'all' | 'active' | 'done';
