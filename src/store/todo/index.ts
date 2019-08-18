import state, { State } from '@/store/todo/state';
import actions from '@/store/todo/actions';
import mutations from '@/store/todo/mutations';
import getters from '@/store/todo/getters';
import * as Store from '@/types/store';

export * from '@/store/todo/state';

export { state, actions, mutations, getters };

export type StateTree = {
  todo: State;
};

export type RootState = Pick<StateTree, 'todo'>;

export type GetterTree = {
  todo: Store.GetterReturnType<typeof getters>;
};

export type ActionTree = {
  todo: Store.DispatchArgs<typeof actions>;
};
