import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './modules/module_mapper';
import todoStore from './modules/todo/store';

Vue.use(Vuex);

export default (moduleName: string, initialState?: any) => {
  const storeModules = (() => {
    if (moduleName === modules.todo) {
      return { [modules.todo]: todoStore(initialState) };
    }

    throw new Error('invalid module name');
  })();

  return new Vuex.Store({
    modules: storeModules,
  });
};