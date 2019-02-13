import { DefineActions } from 'vuex-type-helper';
import { GlobalState } from './state';
import { GlobalMutations } from './mutations';

export interface GlobalActions {
  updateLayoutHidden: boolean;
}

export const actions: DefineActions<GlobalActions, GlobalState, GlobalMutations> = {
  updateLayoutHidden: ({commit}, value) => commit('updateLayoutHidden', value),
};
