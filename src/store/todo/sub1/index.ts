import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/store/module_mapper';
import * as Store from '@/types/store';

export const state = () => ({
  name: 'sub module 1',
  counter: 0,
});

export type State = ReturnType<typeof state>;
export interface StateTree {
  'todo/sub1': State;
}

// ---------------------------------------------

export const mutations = {
  increment(state: State) {
    state.counter += 1;
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkMutationTypes: MutationTree<State> = mutations; // don't remove this line;

// ---------------------------------------------

export const getters = {
  currentNumber: (state: State) => `current value is ${state.counter}`,
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkGetterTypes: GetterTree<State, Context['rootState']> = getters; // don't remove this line;

export interface GetterTree {
  'todo/sub1': Store.GetterReturnType<typeof getters>;
}

// ---------------------------------------------

type Context = Store.ActionContext<State, typeof mutations, RootState>;
export const actions = {
  increment(ctx: Context) {
    ctx.commit('increment', undefined);
  },
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkActionTypes: ActionTree<State, Context['rootState']> = actions; // don't remove this line;

export interface ActionTree {
  'todo/sub1': Store.DispatchArgs<typeof actions>;
}
