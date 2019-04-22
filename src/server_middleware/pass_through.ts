import { Nuxt } from '@/types/nuxt';

export default (
  req: Nuxt.Context['req'],
  res: Nuxt.Context['res'],
  next: () => void
) => {
  next();
};
