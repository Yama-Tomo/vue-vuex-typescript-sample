import Vue from 'vue';
import Vuex from 'vuex';
import * as ns from './namespace_maps';
import { todoStore } from './modules/todo/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    [ns.todoModuleName]: todoStore,
  },
});
