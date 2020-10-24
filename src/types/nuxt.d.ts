import Vue, { VueConstructor } from 'vue';
import { ExtendedVue } from 'vue/types/vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { Context as OrgContext } from '@nuxt/types';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n, { IVueI18n } from 'vue-i18n';
import * as vts from 'vue-tsx-support';

export type ComponentProps<T> = T extends ExtendedVue<
  any,
  any,
  any,
  any,
  infer P
>
  ? unknown extends P
    ? T extends VueConstructor<
        vts._TsxComponentInstanceV3<infer R, any, any, any, any, any>
      >
      ? R
      : never
    : P
  : never;

interface AuthModule {
  ctx: OrgContext;
  options: { [key: string]: any };
  strategies: { [key: string]: any };
  redirect: (name: string, noRouter?: boolean) => void;
  loginWith: (strategy: string, params: any) => Promise<any>;
  logout: () => Promise<any>;
  // TODO: _errorListeners, $storage, $stateの定義を充実させる
  onRedirect: (cb: (to: string, from: string) => string | undefined) => void;
}

export interface NuxtContext extends OrgContext {
  req: OrgContext['req'] & { body: any };
  app: Vue & {
    $auth: AuthModule;
    store: Store<any>;
    i18n: VueI18n & IVueI18n;
    localePath(route: string | Route, locale?: string): string;
    switchLocalePath(locale: string): string;
    getRouteBaseName(route: Route): string;
  };
}

export interface NuxtError {
  statusCode: number;
  path: string;
  message: string;
}
