import { State } from './state';
import { Getters } from '@/types';

const getters = {
  reverse: (state: State): State['todos'] => [...state.todos].reverse(),
  latest:
    (_state: State, otherGetters: unknown) =>
    (limit: number): State['todos'] =>
      // eslint-disable-next-line no-use-before-define
      (otherGetters as GetterTree).reverse.slice(0, limit),
};

export default getters;
export type GetterTree = Getters<State, typeof getters>;
