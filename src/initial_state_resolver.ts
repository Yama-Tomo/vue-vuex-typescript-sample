import { Store } from 'vuex';
import { initialStateResolvers, isExistsResolver } from './namespace_maps';

export default (initialState: any, store: Store<any>): void => {
  const replaceState: { [key: string]: any } = {};

  for (const moduleName in initialState) {
    if (!isExistsResolver(moduleName)) {
      continue;
    }

    const values = initialState[moduleName];
    replaceState[moduleName] = initialStateResolvers[moduleName](values);
  }

  if (Object.keys(replaceState).length) {
    store.replaceState(replaceState);
  }
};
