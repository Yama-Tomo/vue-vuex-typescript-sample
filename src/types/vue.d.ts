import { Nuxt } from './nuxt';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string | ((ctx: Nuxt.Context) => string);
    auth?: boolean;
    asyncData?(ctx: Nuxt.Context): object | undefined;
    fetch?(ctx: Nuxt.Context): Promise<void> | void;
    validate?(ctx: Nuxt.Context): Promise<boolean> | boolean;
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

