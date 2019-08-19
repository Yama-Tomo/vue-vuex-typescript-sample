import Todo from './state/todo';
import { modules } from '@/modules/module_mapper';
import { hasKey } from '@/utils/type_guard';

export interface TodoState {
  todos: Todo[];
}

export default function state(): TodoState {
  return {
    todos: [],
  };
}

export const initialStateResolver = (initialState: unknown): TodoState => {
  const resolvedState = state();
  const canStateSetup = (
    v: unknown
  ): v is { [modules.todo]: { todos: unknown[] } } => {
    if (hasKey(v, modules.todo)) {
      const module = v[modules.todo];
      if (hasKey(module, 'todos') && Array.isArray(module.todos)) {
        return true;
      }
    }

    return false;
  };

  if (!canStateSetup(initialState)) {
    return resolvedState;
  }

  initialState[modules.todo].todos.forEach(v => {
    if (hasKey(v, ['text', 'done'])) {
      resolvedState.todos.push({ text: String(v.text), done: !!v.done });
    }
  });

  return resolvedState;
};
