import state, { State } from '@/store/todo/state';
import actions from '@/store/todo/actions';
import mutations from '@/store/todo/mutations';
import getters from '@/store/todo/getters';
import * as Store from '@/types/store';
import * as Sub1 from '@/store/todo/sub1';

export * from '@/store/todo/state';

export { state, actions, mutations, getters };

export type StateTree = {
  todo: State & {
    sub1: Sub1.StateTree;
  };
} & Sub1.StateTree;

export type RootState = Pick<StateTree, 'todo'>;

export type GetterTree = {
  todo: Store.GetterReturnType<typeof getters> & {
    sub1: Sub1.GetterTree;
  };
} & Sub1.GetterTree;

export type ActionTree = {
  todo: Store.DispatchArgs<typeof actions> & {
    sub1: Sub1.ActionTree;
  };
} & Sub1.ActionTree;
