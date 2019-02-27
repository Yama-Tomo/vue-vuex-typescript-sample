import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { modules } from './modules/module_mapper';

Vue.config.productionTip = false;

new Vue({
  store: store(modules.todo, (window as any).__INITIAL_STATE__),
  render: (h) => h(App),
}).$mount('#app');
