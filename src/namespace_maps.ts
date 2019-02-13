import { TodoState } from './store_modules/todo/state';
import { TodoActions } from './store_modules/todo/actions';
import { TodoGetters } from './store_modules/todo/getters';
import { todoStore } from './app_modules/todo/store';
import { AuthState } from './store_modules/auth/state';

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

export const stores = {
  [modules.todo]: todoStore,
};

