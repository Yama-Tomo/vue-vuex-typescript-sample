import { DefineMutations } from 'vuex-type-helper';
import { GlobalState } from './state';

export interface GlobalMutations {
  updateLayoutHidden: boolean;
}

export const mutations: DefineMutations<GlobalMutations, GlobalState> = {
  updateLayoutHidden: (state, value) => state.hiddenLayout = value,
};
