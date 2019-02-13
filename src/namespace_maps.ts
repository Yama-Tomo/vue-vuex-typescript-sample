import { TodoState } from './store_modules/todo/store/state';
import { TodoActions } from './store_modules/todo/store/actions';
import { TodoGetters } from './store_modules/todo/store/getters';
import { todoStore } from './app_modules/todo/store';
import { AuthState } from './store_modules/auth/store/state';

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

