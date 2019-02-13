import Todo from './state/todo';

export interface TodoState {
  todos: Todo[];
}

const defaultState = (): TodoState => ({
  todos: [],
});

export default defaultState;

export const initialStateResolver = (initialState: any): TodoState => {
  const canStateSetup = initialState.hasOwnProperty('todos') &&
    Array.isArray(initialState.todos);

  if (!canStateSetup) {
    return defaultState();
  }

  const state = defaultState();
  const todos = initialState.todos as any[];
  for (let i = 0; i <= todos.length; i++) {
    const todo = todos[i];

    if (typeof todo === 'object' && todo.hasOwnProperty('text') && todo.hasOwnProperty('done')) {
      state.todos.push({ text: todo.text as string, done: !!todo.done });
    }
  }

  return state;
};
