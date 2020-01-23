import { Store } from 'vuex';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify/lib';
import i18nEnMessage from '@/i18n/en';

export const store = (): Store<any> =>
  StoryBookNuxtIntegrationVuex.createStore();

export const i18n = () =>
  new VueI18n({
    locale: 'en',
    messages: { en: i18nEnMessage },
  });

export const router = () => StoryBookNuxtIntegrationRouter.createRouter();

export const isRunWithJest = () =>
  typeof StoryBookNuxtIntegrationVuex === 'undefined' ||
  typeof StoryBookNuxtIntegrationRouter === 'undefined';

export const vuetify = () => new Vuetify({ icons: { iconfont: 'mdi' } });
