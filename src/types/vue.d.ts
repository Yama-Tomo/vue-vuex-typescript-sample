import Vue, { VueConstructor } from 'vue';
import { ExtendedVue } from 'vue/types/vue';
import * as vts from 'vue-tsx-support';

declare module '*.vue' {
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
    ? T extends VueConstructor<
        vts._TsxComponentInstanceV3<infer R, any, any, any, any, any>
      >
      ? R
      : never
    : P
  : never;
