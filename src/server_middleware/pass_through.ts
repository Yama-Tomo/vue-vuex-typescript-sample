import { NuxtContext } from '@/types';

export default (
  _req: NuxtContext['req'],
  _res: NuxtContext['res'],
  next: () => void
) => {
  next();
};
