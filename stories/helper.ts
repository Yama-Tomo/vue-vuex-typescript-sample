import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import { state, actions, mutations, getters } from '@/store/todo';
import i18nEnMessage from '@/i18n/en';

export const store = () =>
  new Vuex.Store({
    modules: {
      todo: {
        namespaced: true,
        state,
        actions,
        mutations,
        getters,
      },
    },
  });

export const i18n = () =>
  new VueI18n({
    locale: 'en',
    messages: { en: i18nEnMessage },
  });

export const router = () => new VueRouter({ routes: [] });
