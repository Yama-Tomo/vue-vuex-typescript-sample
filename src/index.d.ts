import Vue from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n, { IVueI18n } from 'vue-i18n';
// NOTE: 型定義を手動でimportしないとコンポーネント内でlocalePathがコンパイルエラーで呼び出せないのでここでimportしておく
import NuxtI18n from 'nuxt-i18n/types/vue';

interface NuxtContext {
  isDev: boolean;
  isHMR: boolean;
  isStatic: boolean;
  route: Route;
  store: Store<any>;
  env: object;
  query: { [key: string]: any };
  nuxtState: object;
  req: Request;
  res: Response;
  params: { [key: string]: any };
  redirect: (path: string) => void;
  error: (params: { statusCode?: Number; message?: String }) => void;
  beforeNuxtRender: (arg: { Conmponents: any, nuxtState: any }) => void;
  $axios: NuxtAxiosInstance;
  app: {
    $auth: {
      ctx: NuxtContext
      options: { [key: string]: any }
      strategies: { [key: string]: any }
      redirect: (name: string, noRouter?: boolean) => void,
      // TODO: _errorListeners, $storage, $stateの定義を充実させる
    }
    i18n: VueI18n
    store: Store<any>
    localePath(route: string | Route, locale?: string): string
    switchLocalePath(locale: string): string
    getRouteBaseName(route: Route): string,
    i18n: VueI18n & IVueI18n;
  };
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    middleware?: string | String[];
    fetch?: (context: NuxtContext) => void;
    asyncData?: (context: NuxtContext) => void;
    scrollToTop?: boolean;
    transition?: string | object | Function;
    validate?: (context: NuxtContext) => boolean;
    head?: () => { [key: string]: any };
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
    $axios: NuxtAxiosInstance;
    $route: Route;
  }
}

