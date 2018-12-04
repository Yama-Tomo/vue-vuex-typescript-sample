import Vue, { ComponentOptions } from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n from 'vue-i18n';
import * as NuxtI18nTypes from 'nuxt-i18n/types';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
  }
}

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
  error: (params: { statusCode?: number; message?: string }) => void;
  beforeNuxtRender: (arg: { Conmponents: any, nuxtState: any }) => void;
  $axios: NuxtAxiosInstance;  // axios-moduleを利用している場合
  app: {
    $auth: {
      ctx: NuxtContext
      options: { [key: string]: any }
      strategies: { [key: string]: any }
      redirect: (name: string, noRouter?: boolean) => void,
      // TODO: _errorListeners, $storage, $stateの定義
    }
    i18n: VueI18n
    store: Store<any>
    localePath(route: string | Route, locale?: string): string
    switchLocalePath(locale: string): string
    getRouteBaseName(route: Route): string,
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      ctx: NuxtContext
      options: { [key: string]: any }
      strategies: { [key: string]: any }
      redirect: (name: string, noRouter?: boolean) => void
      loginWith: (strategy: string, params: any) => Promise<any>
      logout: () => Promise<any>,
    };
    $axios: NuxtAxiosInstance;
    $route: Route;
  }
}

