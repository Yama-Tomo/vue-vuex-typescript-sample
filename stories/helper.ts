import { Store } from 'vuex';
import VueI18n from 'vue-i18n';
import i18nEnMessage from '@/i18n/en';

export const store = (): Store<any> =>
  StoryBookNuxtIntegrationVuex.createStore();

export const i18n = () =>
  new VueI18n({
    locale: 'en',
    messages: { en: i18nEnMessage },
  });

export const router = () => StoryBookNuxtIntegrationRouter.createRouter();
