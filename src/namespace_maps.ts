import { TodoState } from './store_modules/todo/state';
import { TodoActions } from './store_modules/todo/actions';
import { TodoGetters } from './store_modules/todo/getters';
import { todoStore } from './app_modules/todo/store';
import { AuthState } from './store_modules/auth/state';

export const todoModuleName = 'todo_module';
export const authModuleName = 'auth';

export interface StateMaps {
  [todoModuleName]: TodoState;
  [authModuleName]: AuthState;
}

export interface ActionMaps {
  [todoModuleName]: TodoActions;
}

export interface GettersMaps {
  [todoModuleName]: TodoGetters;
}

export const stores = {
  [todoModuleName]: todoStore,
};

