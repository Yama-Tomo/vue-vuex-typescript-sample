import { Todo } from './state/todo';
import { hasKey } from '@/utils/type_guard';

export interface TodoState {
  todos: Todo[];
}

const defaultState = (): TodoState => ({
  todos: [],
});

export default defaultState;

export const initialStateResolver = (initialState: unknown): TodoState => {
  const state = defaultState();
  const canStateSetup = (v: unknown): v is { todos: unknown[] } =>
    hasKey(v, 'todos') && Array.isArray(v.todos);

  if (!canStateSetup(initialState)) {
    return state;
  }

  initialState.todos.forEach(v => {
    if (hasKey(v, ['text', 'done'])) {
      state.todos.push({ text: String(v.text), done: !!v.done });
    }
  });

  return state;
};
