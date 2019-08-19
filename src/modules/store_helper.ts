import { Store } from 'vuex';
import set from 'lodash/set';
import get from 'lodash/get';
import { ActionTree, StateTree, GetterTree } from './module_mapper';

export const getActions = <K extends keyof ActionTree>(
  namespace: K,
  store: Store<any>
): ActionTree[K] => {
  const nestLevel = namespace.split('/').length;

  return Object.keys((store as any)._actions).reduce(
    (actions: any, name: string) => {
      if (!name.includes(namespace)) {
        return actions;
      }

      const assignKey = name
        .split('/')
        .slice(nestLevel)
        .join('.');
      const dispatch = (payload: unknown) => store.dispatch(name, payload);
      return set(actions, assignKey, dispatch);
    },
    {}
  );
};

export const getGetters = <K extends keyof GetterTree>(
  namespace: K,
  store: Store<any> | Record<string, any>
): GetterTree[K] => {
  const nestLevel = namespace.split('/').length;
  const target = store instanceof Store ? store.getters : store;

  return Object.keys(target).reduce((getters: any, name: string) => {
    if (!name.includes(namespace)) {
      return getters;
    }

    let objectRef: any = getters;

    const namespaceKeys = name.split('/').slice(nestLevel);
    namespaceKeys.forEach((key, index) => {
      if (index === namespaceKeys.length - 1) {
        const getterFunction = target.__lookupGetter__(name);
        if (getterFunction != null) {
          objectRef.__defineGetter__(key, target.__lookupGetter__(name));
        }
      } else {
        objectRef[key] = objectRef[key] || {};
        objectRef = objectRef[key];
      }
    });

    return getters;
  }, {});
};

export const getState = <K extends keyof StateTree>(
  namespace: K,
  store: Store<any>
): StateTree[K] => get(store.state, namespace.replace(/\//, '.'));
