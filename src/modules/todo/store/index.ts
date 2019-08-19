import defaultState, { initialStateResolver, State } from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import * as Store from '@/types/store';

export * from './state';

export const module = (initialState?: unknown) => {
  const state = initialState
    ? initialStateResolver(initialState)
    : defaultState();

  return {
    todoModule: {
      namespaced: true,
      state,
      mutations,
      actions,
      getters,
    },
  };
};

export type StateTree = {
  todoModule: State;
};

export type RootState = Pick<StateTree, 'todoModule'>;

export type GetterTree = {
  todoModule: Store.GetterReturnType<typeof getters>;
};

export type ActionTree = {
  todoModule: Store.DispatchArgs<typeof actions>;
};
