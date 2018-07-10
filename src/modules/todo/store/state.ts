import { Todo } from '../data/todo';

export interface TodoState {
  todos: Todo[];
}

export const state: TodoState = {
  todos: [],
};
