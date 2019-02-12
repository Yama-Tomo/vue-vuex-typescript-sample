import { DefineMutations } from 'vuex-type-helper';
import Todo from './state/todo';
import { TodoState } from './state';

export interface TodoMutations {
  addTodo: Todo;
  removeTodo: Todo;
  updateTodo: {
    todo: Todo,
    text?: string,
    done?: boolean,
  };
}

export const mutations: DefineMutations<TodoMutations, TodoState> = {
  addTodo(state, todo) {
    state.todos.push(todo);
  },
  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },
  updateTodo(state, { todo, text, done }) {
    if (text) {
      todo.text = text;
    }

    if (done !== undefined) {
      todo.done = done;
    }
  },
};
