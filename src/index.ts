import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store: store((window as any).__INITIAL_STATE__),
  render: h => h(App),
}).$mount('#app');
