import type { Module } from 'vuex';
import { RootState } from '../../module_mapper';
import defaultState, { initialStateResolver, State } from './state';
import mutations from './mutations';
import actions, { ActionTree as TodoActTree } from './actions';
import getters, { GetterTree as TodoGetterTree } from './getters';

type ModuleNameSpace = 'todoModule';

export * from './state';

export const module = (
  initialState?: unknown
): Record<ModuleNameSpace, Module<State, RootState>> => {
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

export type StateTree = Record<ModuleNameSpace, State>;
export type GetterTree = Record<ModuleNameSpace, TodoGetterTree>;
export type ActionTree = Record<ModuleNameSpace, TodoActTree>;
