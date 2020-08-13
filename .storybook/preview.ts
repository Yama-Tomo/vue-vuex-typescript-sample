import { addDecorator } from '@storybook/vue';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuetify, { VApp } from 'vuetify/lib';
import * as Helper from '../stories/helper';

/* eslint-disable @typescript-eslint/no-var-requires */
if (process.env.NODE_ENV === 'test') {
  require('babel-plugin-require-context-hook/register')();
}

require('vuetify/dist/vuetify.css');
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
    components: { VApp },
    store: Helper.store(),
    vuetify: Helper.vuetify(),
    i18n: Helper.i18n(),
    router: Helper.router(),
  };
});
