import Vue from 'vue';
import { ExtendedVue } from 'vue/types/vue';
import * as vts from 'vue-tsx-support';
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

export type ComponentProps<T> = T extends ExtendedVue<
  any,
  any,
  any,
  any,
  infer P
>
  ? unknown extends P
    ? T extends vts.TsxComponent<any, infer P2, any, any>
      ? P2
      : never
    : P
  : never;
