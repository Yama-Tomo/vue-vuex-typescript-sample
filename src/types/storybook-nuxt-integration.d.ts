import { Store } from 'vuex';
import VueRouter from 'vue-router';

declare global {
  const StoryBookNuxtIntegrationVuex: {
    createStore: () => Store<any>;
  };

  const StoryBookNuxtIntegrationRouter: {
    createRouter: () => VueRouter;
    routerOptions: any;
  };
}
