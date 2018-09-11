import { TodoState } from './modules/todo/store/state';
import { TodoActions } from './modules/todo/store/actions';
import { TodoGetters } from './modules/todo/store/getters';
import { todoStore } from './modules/todo/store';

export const todoModuleName = 'todo_module';

export interface StateMaps {
  [todoModuleName]: TodoState;
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

