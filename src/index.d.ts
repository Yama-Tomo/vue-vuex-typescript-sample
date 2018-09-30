import Vue, { ComponentOptions } from 'vue';
import { Route } from 'vue-router';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      loginWith: (strategy: string, params: any) => Promise<any>;
      redirect: (name: string, noRouter?: boolean) => void;
      logout: () => Promise<any>;
    };
    $route: Route;
  }
}
