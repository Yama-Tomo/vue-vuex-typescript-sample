import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import { TodoModule } from './modules/store';

Vue.config.productionTip = false;
Vue.use(Vuex);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const vuexStore = (initialState?: any) => {
  return new Vuex.Store({
    modules: {
      ...TodoModule(initialState),
    },
  });
};

new Vue({
  store: vuexStore((window as any).__INITIAL_STATE__),
  render: h => h(App),
}).$mount('#app');
