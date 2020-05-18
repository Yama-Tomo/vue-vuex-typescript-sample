import { RootState } from '@/store/module_mapper';
import * as Store from '@/types/store';

export const state = () => ({
  name: 'sub module 1',
  counter: 0,
});

export type State = ReturnType<typeof state>;

// ---------------------------------------------

export const mutations = {
  increment(state: State) {
    state.counter += 1;
  },
};

export type MutationTree = Store.Mutations<State, typeof mutations>;

// ---------------------------------------------

export const getters = {
  currentNumber: (state: State) => `current value is ${state.counter}`,
};

export type GetterTree = Store.Getters<State, typeof getters>;

// ---------------------------------------------

type Context = Store.ActionContext<State, MutationTree, RootState>;
export const actions = {
  increment(ctx: Context) {
    ctx.commit('increment', undefined);
  },
};

export type ActionTree = Store.Dispatchers<State, typeof actions>;
