import Todo from './state/todo';

export interface TodoState {
  todos: Todo[];
}

const defaultState = (): TodoState => ({
  todos: [],
});

export default defaultState;

