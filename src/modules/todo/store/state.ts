import Todo from './state/todo';

export interface TodoState {
  todos: Todo[];
}

export const state: TodoState = {
  todos: [],
};
