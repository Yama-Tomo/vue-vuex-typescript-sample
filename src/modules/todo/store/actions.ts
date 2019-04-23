import { DefineActions } from 'vuex-type-helper';
import Todo from './state/todo';
import { TodoState } from './state';
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
}

const actions: DefineActions<TodoActions, TodoState, TodoMutations> = {
  addTodo({ commit }, { text }) {
    commit('addTodo', new Todo(text, false));
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
};

export default actions;
