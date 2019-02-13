import Todo from './state/todo';
import { state, TodoState } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

export const todoStore = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export const initialStateResolver = (values: any): TodoState => {
  const todos: Todo[] = (values.todos as any[] || []).filter((value) => {
    return value.hasOwnProperty('text') && value.hasOwnProperty('done');
  }).map((value) => {
    return new Todo(value.text.toString(), !!value.done);
  });

  return { todos };
};
