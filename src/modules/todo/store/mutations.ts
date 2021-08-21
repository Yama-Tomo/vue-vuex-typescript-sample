import { State, Todo } from './state';
import { Mutations } from '@/types';

const mutations = {
  addTodo(state: State, todo: Todo): void {
    state.todos.push(todo);
  },
  removeTodo(state: State, todo: Todo): void {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  updateTodo(
    _state: State,
    { todo, text, done }: { todo: Todo; text?: string; done?: boolean }
  ): void {
    if (text) {
      todo.text = text;
    }

    if (done !== undefined) {
      todo.done = done;
    }
  },
};

export default mutations;
export type MutationTree = Mutations<State, typeof mutations>;
