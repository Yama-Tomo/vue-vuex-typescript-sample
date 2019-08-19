import { GetterTree } from 'vuex';
import { State } from './state';
import { GetterReturnType } from '@/types/store';
import { RootState } from '@/modules/module_mapper';

const getters = {
  reverse: (state: State) => [...state.todos].reverse(),
  latest: (_state: State, otherGetters: unknown) => (limit: number) =>
    (otherGetters as OtherGetters).reverse.slice(0, limit),
};

type OtherGetters = GetterReturnType<typeof getters>;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: GetterTree<State, RootState> = getters; // don't remove this line;

export default getters;
