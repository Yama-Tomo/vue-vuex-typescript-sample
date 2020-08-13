import { Getters } from '@/types/store';
import { State } from './state';

const getters = {
  reverse: (state: State) => [...state.todos].reverse(),
  latest: (_state: State, otherGetters: unknown) => (limit: number) =>
    (otherGetters as GetterTree).reverse.slice(0, limit),
};

export default getters;
export type GetterTree = Getters<State, typeof getters>;
