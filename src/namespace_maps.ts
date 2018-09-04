import { TodoState } from './modules/todo/store/state';
import { TodoActions } from './modules/todo/store/actions';
import { TodoGetters } from './modules/todo/store/getters';
import { todoStore, initialStateResolver as todoInitialStateResolver } from './modules/todo/store';

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

export const initialStateResolvers: initialStateResolverMaps = {
  [todoModuleName]: todoInitialStateResolver,
};


type initialStateResolverMaps = {
  [K in keyof StateMaps]: (values: any) => StateMaps[K];
};

export const isExistsResolver = (moduleName: string): moduleName is (keyof initialStateResolverMaps) => {
  return initialStateResolvers.hasOwnProperty(moduleName);
};
