import { hasKey } from '@/utils/type_guard';

export type Todo = {
  text: string;
  done: boolean;
};

export type State = {
  todos: Todo[];
};

export default function state(): State {
  return {
    todos: [],
  };
}

export const initialStateResolver = (initialState: unknown): State => {
  const resolvedState = state();
  const canStateSetup = (v: unknown): v is { todos: unknown[] } =>
    hasKey(v, 'todos') && Array.isArray(v.todos);

  if (!canStateSetup(initialState)) {
    return resolvedState;
  }

  initialState.todos.forEach((v) => {
    if (hasKey(v, ['text', 'done'])) {
      resolvedState.todos.push({ text: String(v.text), done: !!v.done });
    }
  });

  return resolvedState;
};
