import { hasKey } from '@/utils/type_guard';

export interface Todo {
  text: string;
  done: boolean;
}

export interface State {
  todos: Todo[];
}

export default function state(): State {
  return {
    todos: [],
  };
}

export const initialStateResolver = (initialState: unknown): State => {
  const resolvedState = state();
  const canStateSetup = (
    v: unknown
  ): v is { todoModule: { todos: unknown[] } } =>
    hasKey(v, 'todoModule') &&
    hasKey(v.todoModule, 'todos') &&
    Array.isArray(v.todoModule.todos);

  if (!canStateSetup(initialState)) {
    return resolvedState;
  }

  initialState.todoModule.todos.forEach(v => {
    if (hasKey(v, ['text', 'done'])) {
      resolvedState.todos.push({ text: String(v.text), done: !!v.done });
    }
  });

  return resolvedState;
};
