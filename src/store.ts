import Vue from 'vue';
import Vuex from 'vuex';
import * as ns from './namespace_maps';
import { todoStore, initialStateResolver as todoInitialStateResolver } from './modules/todo/store';

Vue.use(Vuex);

export const initialStateResolvers: { [key: string]: (val: any) => any } = {
  [ns.todoModuleName]: todoInitialStateResolver,
};

export default new Vuex.Store({
  modules: {
    [ns.todoModuleName]: todoStore,
  },
});
