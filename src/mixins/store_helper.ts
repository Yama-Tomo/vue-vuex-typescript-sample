import { Vue, Component } from 'nuxt-property-decorator';
import { Store } from 'vuex';
import {
  StateMaps,
  ActionMaps,
  GettersMaps,
} from '../store_modules/module_mapper';

export type Actions<A> = {
  [K in keyof A]: (payload: A[K]) => Promise<any> | void;
};

export type Getters<G> = { [K in keyof G]: G[K] };

export class StoreHelper {
  public static getState<K extends keyof StateMaps>(
    store: Store<any>,
    module: K
  ): StateMaps[K] {
    return store.state[module];
  }

  public static getGetters<K extends keyof GettersMaps>(
    store: Store<any>,
    module: K
  ): Getters<GettersMaps[K]> {
    return Object.keys(store.getters).reduce((getters: any, name: string) => {
      const namespacePaths = name.split('/');

      if (namespacePaths.length === 1) {
        getters[name] = store.getters[name];
      } else {
        if (module !== namespacePaths[0]) {
          return getters;
        }
        getters[namespacePaths[1]] = store.getters[name];
      }

      return getters;
    }, {});
  }

  public static getActions<K extends keyof ActionMaps>(
    store: Store<any>,
    module: K
  ): Actions<ActionMaps[K]> {
    return Object.keys((store as any)._actions).reduce(
      (actions: any, name: string) => {
        const namespacePaths = name.split('/');

        if (namespacePaths.length === 1) {
          actions[name] = (payload: any) => store.dispatch(name, payload);
        } else {
          if (module !== namespacePaths[0]) {
            return actions;
          }
          actions[namespacePaths[1]] = (payload: any) =>
            store.dispatch(name, payload);
        }

        return actions;
      },
      {}
    );
  }
}

/**
 * vuexがinjectするストアからstate, getter, actionを型付けしつつ返します
 * componentがストアに依存しないよう全てのコンポーネントでこのmixinを使用せずに
 * container componentでの使用にとどめ，propsでstate, getter, actionを渡す実装がよいでしょう
 */
@Component
export class StoreHelperMixin extends Vue {
  public getState<K extends keyof StateMaps>(module: K) {
    return StoreHelper.getState(this.$store, module);
  }

  public getGetters<K extends keyof GettersMaps>(module: K) {
    return StoreHelper.getGetters(this.$store, module);
  }

  public getActions<K extends keyof ActionMaps>(module: K) {
    return StoreHelper.getActions(this.$store, module);
  }
}
