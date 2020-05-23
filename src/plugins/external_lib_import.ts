import { NuxtContext } from '@/types';
import ExternalLibWrapper from '@/utils/external_lib_wrapper';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const waitLoadedExternalLib = async (assertFunction: () => boolean) => {
  if (assertFunction()) {
    return;
  }

  await sleep();
  await waitLoadedExternalLib(assertFunction);
};

export default (
  _ctx: NuxtContext,
  inject: (
    pluginName: string,
    f: (...args: unknown[]) => unknown | void
  ) => void
) => {
  inject('importJQuery', async () => {
    await waitLoadedExternalLib(() => (window as any).jQuery !== undefined);

    try {
      const module = await import('jquery');
      ExternalLibWrapper.jquery = module.default;
      /* eslint-disable-next-line no-empty */
    } catch (e) {}
  });
};
