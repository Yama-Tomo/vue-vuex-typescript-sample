import { configure } from '@storybook/vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import Router from 'vue-router';

if (process.env.NODE_ENV === 'test') {
  require('babel-plugin-require-context-hook/register')();
}

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(Router);

function loadStories() {
  const req = require.context('../stories', true, /.story.tsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
