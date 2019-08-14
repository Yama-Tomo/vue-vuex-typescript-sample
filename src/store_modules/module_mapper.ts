import * as Todo from './todo/';
import * as Auth from './auth/';

export const modules = {
  todo: 'todo',
  auth: 'auth',
} as const;

export interface StateMaps {
  [modules.todo]: Todo.TodoState;
  [modules.auth]: Auth.AuthState;
}

export interface ActionMaps {
  [modules.todo]: Todo.TodoActions;
}

export interface GettersMaps {
  [modules.todo]: Todo.TodoGetters;
}
