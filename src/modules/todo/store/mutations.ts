import { MutationTree } from 'vuex';
import { State, Todo } from './state';

const mutations = {
  addTodo(state: State, todo: Todo) {
    state.todos.push(todo);
  },
  removeTodo(state: State, todo: Todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  updateTodo(
    _state: State,
    { todo, text, done }: { todo: Todo; text?: string; done?: boolean }
  ) {
    if (text) {
      todo.text = text;
    }

    if (done !== undefined) {
      todo.done = done;
    }
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: MutationTree<State> = mutations; // don't remove this line;

export default mutations;
