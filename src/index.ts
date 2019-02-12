import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { modules } from './namespace_maps';

Vue.config.productionTip = false;

new Vue({
  store: store(modules.todo),
  render: (h) => h(App),
}).$mount('#app');
