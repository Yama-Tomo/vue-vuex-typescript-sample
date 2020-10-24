import { Getters } from '@/types';
import { State } from './state';

const getters = {
  reverse: (state: State): State['todos'] => [...state.todos].reverse(),
  latest: (_state: State, otherGetters: unknown) => (
    limit: number
    // eslint-disable-next-line no-use-before-define
  ): State['todos'] => (otherGetters as GetterTree).reverse.slice(0, limit),
};

export default getters;
export type GetterTree = Getters<State, typeof getters>;
