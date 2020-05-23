import { Configuration as NuxtConfiguration } from '@nuxt/types';

type BuildConfiguration = NonNullable<NuxtConfiguration['build']>;
type ExtendBuildArgs = Parameters<NonNullable<BuildConfiguration['extend']>>;

export interface ModuleContext {
  nuxt: {
    hook: (name: string, fn: () => void) => void;
  };
  extendBuild: (fn: (...args: ExtendBuildArgs) => void) => void;
}
