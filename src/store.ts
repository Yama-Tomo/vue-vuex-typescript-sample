import Vue from 'vue';
import Vuex from 'vuex';
import { module as TodoModule } from '@/modules/todo/store';

Vue.use(Vuex);

export default (initialState?: any) => {
  return new Vuex.Store({
    modules: {
      ...TodoModule(initialState),
    },
  });
};
