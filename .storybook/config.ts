import { configure } from '@storybook/vue';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

if (process.env.NODE_ENV === 'test') {
  require('babel-plugin-require-context-hook/register')();
}

Vue.use(VueI18n);

function loadStories() {
  const req = require.context('../stories', true, /.story.tsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
