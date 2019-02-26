import { Nuxt } from './nuxt';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    middleware?: string | string[];
    fetch?: (context: Nuxt.Context) => void;
    asyncData?: (context: Nuxt.Context) => void;
    scrollToTop?: boolean;
    transition?: string | object | function;
    validate?: (context: Nuxt.Context) => boolean;
    head?: () => { [key: string]: any };
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
    $axios: NuxtAxiosInstance;
    $route: Route;
  }
}

