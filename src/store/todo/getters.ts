import { State } from './state';
import { Getters } from '@/types/store';

const getters = {
  reverse: (state: State) => [...state.todos].reverse(),
  latest: (_state: State, otherGetters: unknown) => (limit: number) =>
    // eslint-disable-next-line no-use-before-define
    (otherGetters as GetterTree).reverse.slice(0, limit),
};

export default getters;
export type GetterTree = Getters<State, typeof getters>;
