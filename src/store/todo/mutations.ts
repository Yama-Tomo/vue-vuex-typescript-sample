import { MutationTree } from 'vuex';
import defaultState, { State, Todo } from './state';

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
  resetState(state: State) {
    const resetState = defaultState();
    for (const key of Object.keys(resetState) as Array<
      keyof typeof resetState
    >) {
      state[key] = resetState[key];
    }
  },
  setInitialState(state: State, value: State) {
    state.todos = value.todos;
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: MutationTree<State> = mutations; // don't remove this line;

export default mutations;
