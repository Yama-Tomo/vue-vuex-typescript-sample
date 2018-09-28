import { TodoState } from './modules/todo/store/state';
import { TodoActions } from './modules/todo/store/actions';
import { TodoGetters } from './modules/todo/store/getters';
import { todoStore } from './modules/todo/store';
import { AuthState } from './modules/auth/store/state';

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

