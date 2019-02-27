import { TodoState } from './todo/store/state';
import { TodoActions } from './todo/store/actions';
import { TodoGetters } from './todo/store/getters';

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
