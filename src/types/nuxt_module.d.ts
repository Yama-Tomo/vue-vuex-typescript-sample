import { NuxtOptions } from '@nuxt/types';

export type ExtendBuildArgs = Parameters<
  NonNullable<NuxtOptions['build']['extend']>
>;

export interface ModuleContext {
  nuxt: {
    hook: (name: string, fn: () => void) => void;
  };
  extendBuild: (fn: (...args: ExtendBuildArgs) => void) => void;
}
