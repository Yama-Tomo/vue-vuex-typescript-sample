import * as Todo from './todo/';
import * as Auth from './auth/';

export namespace modules {
  export const todo = 'todo';
  export const auth = 'auth';
}

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
