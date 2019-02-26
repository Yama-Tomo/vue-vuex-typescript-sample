import { Route } from 'vue-router';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n, { IVueI18n } from 'vue-i18n';
// NOTE: 型定義を手動でimportしないとコンポーネント内でlocalePathがコンパイルエラーで呼び出せないのでここでimportしておく
import NuxtI18n from 'nuxt-i18n/types/vue';
import { OutgoingMessage } from 'http';

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
    error: (params: { statusCode?: number; message?: string }) => void;
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
      };
      store: Store<any>;
      i18n: VueI18n & IVueI18n;
      localePath(route: string | Route, locale?: string): string;
      switchLocalePath(locale: string): string;
      getRouteBaseName(route: Route): string;
    };
  }

  export interface Error {
    statusCode: number;
    path: string;
    message: string;
  }
}

