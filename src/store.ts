import Vue from 'vue';
import Vuex from 'vuex';
import { stores } from './namespace_maps';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: stores,
});
