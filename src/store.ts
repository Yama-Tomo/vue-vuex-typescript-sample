import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './namespace_maps';
import { todoStore } from './modules/todo/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    [modules.todo]: todoStore,
  },
});
