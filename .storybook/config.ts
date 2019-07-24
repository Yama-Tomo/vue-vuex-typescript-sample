import { configure } from '@storybook/vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';

Vue.use(Vuex);
Vue.use(VueI18n);

function loadStories() {
  const req = require.context('../stories', true, /.story.tsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
