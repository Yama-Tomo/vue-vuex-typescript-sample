import { Nuxt } from '@/types/nuxt';

type Pick<T, K extends keyof T> = T[K];

export default (req: Pick<Nuxt.Context, 'req'>, res: Pick<Nuxt.Context, 'res'>, next: () => void) => {
  next();
};
