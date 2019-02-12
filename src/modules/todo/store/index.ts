import defaultState, { initialStateResolver } from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default (initialState?: any) => {
  const state = defaultState();
  if (initialState) {
    initialStateResolver(state, initialState);
  }

  return {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
};
