import { TodoState } from './modules/todo/store/state';
import { TodoActions } from './modules/todo/store/actions';
import { TodoGetters } from './modules/todo/store/getters';

export const todoModuleName = 'todoModule';

export interface StateMaps {
  [todoModuleName]: TodoState;
}

export interface ActionMaps {
  [todoModuleName]: TodoActions;
}

export interface GettersMaps {
  [todoModuleName]: TodoGetters;
}
