import * as Nuxt from '@/types/nuxt';

export default (
  _req: Nuxt.Context['req'],
  _res: Nuxt.Context['res'],
  next: () => void
) => {
  next();
};
