import { Store } from 'vuex';
import VueRouter from 'vue-router';

/* eslint no-redeclare: 0 */
declare global {
  const StoryBookNuxtIntegrationVuex: {
    createStore: () => Store<any>;
  };

  const StoryBookNuxtIntegrationRouter: {
    createRouter: () => VueRouter;
    routerOptions: any;
  };
}
