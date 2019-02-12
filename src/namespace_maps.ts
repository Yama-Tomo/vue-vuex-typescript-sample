import { TodoState } from './modules/todo/store/state';
import { TodoActions } from './modules/todo/store/actions';
import { TodoGetters } from './modules/todo/store/getters';

export namespace modules {
  export const todo = 'todoModule';
}

export interface StateMaps {
  [modules.todo]: TodoState;
}

export interface ActionMaps {
  [modules.todo]: TodoActions;
}

export interface GettersMaps {
  [modules.todo]: TodoGetters;
}
