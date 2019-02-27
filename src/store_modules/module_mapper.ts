import { TodoState } from './todo/state';
import { TodoActions } from './todo/actions';
import { TodoGetters } from './todo/getters';
import { AuthState } from './auth/state';

export namespace modules {
  export const todo = 'todo';
  export const auth = 'auth';
}

export interface StateMaps {
  [modules.todo]: TodoState;
  [modules.auth]: AuthState;
}

export interface ActionMaps {
  [modules.todo]: TodoActions;
}

export interface GettersMaps {
  [modules.todo]: TodoGetters;
}

