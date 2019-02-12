import { Component, Vue } from 'vue-property-decorator';
import { StateMaps, ActionMaps, GettersMaps } from '../namespace_maps';

export type Actions<A> = {
  [K in keyof A]: (payload: A[K]) => Promise<any> | void
};

export type Getters<G> = {
  [K in keyof G]: G[K]
};

/**
 * vuexがinjectするストアからstate, getter, actionを型付けしつつ返します
 * componentがストアに依存しないよう全てのコンポーネントでこのmixinを使用せずに
 * container componentでの使用にとどめ，propsでstate, getter, actionを渡す実装がよいでしょう
 */
@Component
export class StoreHelperMixin extends Vue {
  public getState<K extends keyof StateMaps>(module: K): StateMaps[K] {
    return this.$store.state[module];
  }

  public getGetters<K extends keyof GettersMaps>(module: K): Getters<GettersMaps[K]> {
    return Object.keys(this.$store.getters).reduce((getters: any, name: string) => {
      const namespacePaths = name.split('/');

      if (namespacePaths.length === 1) {
        getters[name] = this.$store.getters[name];
      } else {
        if (module !== namespacePaths[0]) {
           return getters;
        }
        getters[namespacePaths[1]] = this.$store.getters[name];
      }

      return getters;
    }, {});
  }

  public getActions<K extends keyof ActionMaps>(module: K): Actions<ActionMaps[K]> {
    return Object.keys((this.$store as any)._actions).reduce((actions: any, name: string) => {
      const namespacePaths = name.split('/');

      if (namespacePaths.length === 1) {
        actions[name] = (payload: any) => this.$store.dispatch(name, payload);
      } else {
        if (module !== namespacePaths[0]) {
           return actions;
        }
        actions[namespacePaths[1]] = (payload: any) => this.$store.dispatch(name, payload);
      }

      return actions;
    }, {});
  }
}
