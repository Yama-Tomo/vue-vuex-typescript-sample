import Vue from 'vue';
import App from './App.vue';
import store from './store';
import initialStateResolver from './initial_state_resolver';

Vue.config.productionTip = false;

const initialState = (window as any).__INITIAL_STATE__;

if (initialState instanceof Object) {
  initialStateResolver(initialState, store);
}

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
