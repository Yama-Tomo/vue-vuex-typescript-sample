import { DefineActions } from 'vuex-type-helper';

type Functions = Record<string, (...arg: any[]) => void>;

export type MutationArgs<M extends Functions> = {
  [P in keyof M]: Parameters<M[P]>[1];
};

// prettier-ignore
type Actions<S, M extends Functions> = DefineActions<Record<string, any>, S, MutationArgs<M>>;
// prettier-ignore
type _ActionContext<S, M extends Functions> = Parameters<Actions<S, M>[string]>[0];

export type ActionContext<S, M extends Functions, RootState> = {
  [P in keyof _ActionContext<S, M>]: 'rootState' extends P
    ? RootState
    : _ActionContext<S, M>[P];
};

export type DispatchArgs<A extends Functions> = {
  [P in keyof A]: Parameters<A[P]>[1] extends undefined
    ? () => Promise<any> | void
    : (payload: Parameters<A[P]>[1]) => Promise<any> | void;
};

// prettier-ignore
export type GetterReturnType<G extends Record<string, (...arg: any[]) => any>> = {
  [P in keyof G]: ReturnType<G[P]>;
};
