import { DefineActions } from 'vuex-type-helper';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { RootState } from '@/store/module_mapper';

type MutationArgs<M extends MutationTree<any>> = {
  [P in keyof M]: Parameters<M[P]>[1];
};

// prettier-ignore
type Actions<S, M extends MutationTree<S>> = DefineActions<Record<string, any>, S, MutationArgs<M>>;
// prettier-ignore
// eslint-disable-next-line @typescript-eslint/naming-convention
type _ActionContext<S, M extends MutationTree<S>> = Parameters<Actions<S, M>[string]>[0];

export type ActionContext<S, M extends MutationTree<S>, RootState> = {
  [P in keyof _ActionContext<S, M>]: 'rootState' extends P
    ? RootState
    : _ActionContext<S, M>[P];
};

export type Mutations<S, M extends MutationTree<S>> = M;

type NoArgDispatcher = () => Promise<any> | void;

export type Dispatchers<S, A extends ActionTree<S, RootState>> = {
  [P in keyof A]: A[P] extends undefined
    ? NoArgDispatcher
    : A[P] extends (...args: infer PARAMS) => any
    ? undefined extends PARAMS[1]
      ? NoArgDispatcher
      : (payload: PARAMS[1]) => Promise<any> | void
    : never;
};

export type Getters<S, G extends GetterTree<S, RootState>> = {
  [P in keyof G]: ReturnType<G[P]>;
};
