import { ExtendedVue } from 'vue/types/vue';
import { TsxComponent } from 'vue-tsx-support';

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

export type ComponentProps<T> = T extends ExtendedVue<
  any,
  any,
  any,
  any,
  infer P
>
  ? unknown extends P
    ? T extends TsxComponent<any, infer P2, any, any>
      ? P2
      : never
    : P
  : never;
