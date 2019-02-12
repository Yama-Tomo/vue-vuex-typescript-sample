import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './namespace_maps';
import todoStore from './modules/todo/store';

Vue.use(Vuex);

export default (moduleName: string) => {
  const storeModules = (() => {
    if (moduleName === modules.todo) {
      return { [modules.todo]: todoStore() };
    }

    throw new Error('invalid module name');
  })();

  return new Vuex.Store({
    modules: storeModules,
  });
};
