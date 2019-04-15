import { DefineActions } from 'vuex-type-helper';
import { Todo } from './state/todo';
import { initialStateResolver, TodoState } from './state';
import { TodoMutations } from './mutations';

export interface TodoActions {
  addTodo: {
    text: string;
  };
  removeTodo: {
    todo: Todo;
  };
  editTodo: {
    todo: Todo;
    text: string;
  };
  toggleTodo: {
    todo: Todo;
  };
  toggleAll: {
    done: boolean;
  };
  clearCompleted: {};
  fetchInitialState: undefined;
}

export const actions: DefineActions<TodoActions, TodoState, TodoMutations> = {
  addTodo({ commit }, { text }) {
    commit('addTodo', { text, done: false });
  },
  removeTodo({ commit }, { todo }) {
    commit('removeTodo', todo);
  },
  editTodo({ commit }, { todo, text }) {
    commit('updateTodo', { todo, text });
  },
  toggleTodo({ commit }, { todo }) {
    commit('updateTodo', { todo, done: !todo.done });
  },
  toggleAll({ state, commit }, { done }) {
    state.todos.forEach(todo => {
      commit('updateTodo', { todo, done });
    });
  },
  clearCompleted({ state, commit }) {
    state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo);
      });
  },
  fetchInitialState({ commit }) {
    return new Promise((resolve: () => void) => {
      setTimeout(() => resolve(), 1500);
    }).then(() => {
      commit('resetState', undefined);

      const initialState = initialStateResolver({
        todos: [{ text: 'aaaa', done: false }, { text: 'bbbb', done: true }],
      });
      commit('setInitialState', initialState);
    });
  },
};

export default actions;
