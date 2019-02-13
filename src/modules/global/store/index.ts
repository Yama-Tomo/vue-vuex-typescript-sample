import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

export const globalStore = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
