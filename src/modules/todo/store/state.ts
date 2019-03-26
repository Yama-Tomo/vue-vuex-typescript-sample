import Todo from './state/todo';
import { modules } from '@/modules/module_mapper';

export interface TodoState {
  todos: Todo[];
}

export default (): TodoState => ({
  todos: [],
});

export const initialStateResolver = (state: TodoState, initialState: any) => {
  const canStateSetup = initialState.hasOwnProperty(modules.todo) &&
    initialState[modules.todo].hasOwnProperty('todos') &&
    Array.isArray(initialState[modules.todo].todos);

  if (!canStateSetup) {
    return;
  }

  const todos = initialState[modules.todo].todos as any[];
  for (let i = 0; i <= todos.length; i++) {
    const todo = todos[i];

    if (typeof todo === 'object' && todo.hasOwnProperty('text') && todo.hasOwnProperty('done')) {
      state.todos.push(new Todo(todo.text as string, !!todo.done));
    }
  }
};
