import Vue from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n, { IVueI18n } from 'vue-i18n';
// NOTE: 型定義を手動でimportしないとコンポーネント内でlocalePathがコンパイルエラーで呼び出せないのでここでimportしておく
import NuxtI18n from 'nuxt-i18n/types/vue';
import { OutgoingMessage } from 'http';

export interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

export namespace Nuxt {
  export interface Context {
    isDev: boolean;
    isHMR: boolean;
    isStatic: boolean;
    route: Route;
    store: Store<any>;
    env: object;
    query: { [key: string]: any };
    nuxtState: object;
    req: Request;
    res: OutgoingMessage;
    params: { [key: string]: any };
    redirect: (path: string) => void;
    error: (params: { statusCode?: Number; message?: String }) => void;
    beforeNuxtRender: (arg: { Conmponents: any, nuxtState: any }) => void;
    $axios: NuxtAxiosInstance;
    app: {
      $auth: {
        ctx: Nuxt.Context
        options: { [key: string]: any }
        strategies: { [key: string]: any }
        redirect: (name: string, noRouter?: boolean) => void,
        loginWith: (strategy: string, params: any) => Promise<any>;
        logout: () => Promise<any>;
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

  export interface Error {
    statusCode: number;
    path: string;
    message: string;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    middleware?: string | String[];
    fetch?: (context: Nuxt.Context) => void;
    asyncData?: (context: Nuxt.Context) => void;
    scrollToTop?: boolean;
    transition?: string | object | Function;
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


declare global {
  namespace NodeJS {
    interface Process {
      server: boolean;
    }
  }
}

