import Vue from 'vue';
import App from './App.vue';
import store, { initialStateResolvers } from './store';

Vue.config.productionTip = false;

const initialState = (window as any).__INITIAL_STATE__;

if (initialState instanceof Object) {
  const replaceState: { [key: string]: any } = {};

  for (const moduleName in initialState) {
    if (!initialStateResolvers[moduleName]) {
      continue;
    }

    replaceState[moduleName] = initialStateResolvers[moduleName](initialState[moduleName]);
  }

  if (Object.keys(replaceState).length) {
    store.replaceState(replaceState);
  }
}

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
