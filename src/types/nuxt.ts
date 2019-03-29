import { OutgoingMessage } from 'http';
import Vue from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { Context as OrgContext } from '@nuxt/vue-app/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n, { IVueI18n } from 'vue-i18n';
// NOTE: 型定義を手動でimportしないとコンポーネント内でlocalePathがコンパイルエラーで呼び出せないのでここでimportしておく
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import NuxtI18n from 'nuxt-i18n/types/';

interface AuthModule {
  ctx: Nuxt.Context;
  options: { [key: string]: any };
  strategies: { [key: string]: any };
  redirect: (name: string, noRouter?: boolean) => void;
  loginWith: (strategy: string, params: any) => Promise<any>;
  logout: () => Promise<any>;
  // TODO: _errorListeners, $storage, $stateの定義を充実させる
}

type ReplacedTypeNuxtContext<T> = { [K in keyof T]: T[K] extends Response ? OutgoingMessage : T[K] }

export namespace Nuxt {
  export interface Context extends ReplacedTypeNuxtContext<OrgContext> {
    $axios: NuxtAxiosInstance;
    app: Vue & {
      $auth: AuthModule;
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
