import { NuxtContext } from './nuxt';

declare module 'vue/types/options' {
  interface ComponentOptions {
    auth?: boolean;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      ctx: NuxtContext;
      options: { [key: string]: any };
      strategies: { [key: string]: any };
      redirect: (name: string, noRouter?: boolean) => void;
      loginWith: (strategy: string, params: any) => Promise<any>;
      logout: () => Promise<any>;
    };
    $importJQuery?: () => void;
  }
}
