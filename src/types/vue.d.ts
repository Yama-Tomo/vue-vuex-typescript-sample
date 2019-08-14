import Vue from 'vue';
import * as Nuxt from './nuxt';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      ctx: Nuxt.Context;
      options: { [key: string]: any };
      strategies: { [key: string]: any };
      redirect: (name: string, noRouter?: boolean) => void;
      loginWith: (strategy: string, params: any) => Promise<any>;
      logout: () => Promise<any>;
    };
    $importJQuery?: () => void;
  }
}
