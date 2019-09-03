import { configure, addDecorator } from '@storybook/vue';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import * as Helper from '../stories/helper';

/* eslint-disable @typescript-eslint/no-var-requires */
if (process.env.NODE_ENV === 'test') {
  require('babel-plugin-require-context-hook/register')();
}

// NOTE: see also @nuxtjs/vuetify/lib/module.js
if (process.env.NODE_ENV === 'production') {
  require('vuetify/src/styles/main.sass');
  require('vuetify/lib/components/VApp');
} else if (process.env.NODE_ENV === 'development') {
  require('vuetify/dist/vuetify.css');
}

/* eslint-disable @typescript-eslint/no-var-requires */

Vue.use(VueI18n);
Vue.use(Vuetify);

addDecorator(() => {
  if (Helper.isRunWithJest()) {
    // NOTE: storyshots実行時はwebpackを介していないのでヘルパーのstoreやrouterはundefinedなのでこのまま実行するとエラーになってしまうのと
    // puppeteerにstorybookのpathだけを渡せられればよいのでわざわざcomponentの準備はしない
    return {};
  }

  return {
    template: '<v-app><story/></v-app>',
    store: Helper.store(),
    vuetify: new Vuetify({ icons: { iconfont: 'mdi' } }),
    i18n: Helper.i18n(),
    router: Helper.router(),
  };
});

function loadStories() {
  const req = require.context('../stories', true, /.story.tsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
