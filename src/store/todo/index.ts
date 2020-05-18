import state, { State } from '@/store/todo/state';
import actions, { ActionTree as TodoActTree } from '@/store/todo/actions';
import mutations from '@/store/todo/mutations';
import getters, { GetterTree as TodoGetterTree } from '@/store/todo/getters';
import * as Sub1 from '@/store/todo/sub1';

export * from '@/store/todo/state';
export { state, actions, mutations, getters };

export type StateTree = {
  todo: State & {
    sub1: Sub1.State;
  };
};

export type GetterTree = {
  todo: TodoGetterTree & {
    sub1: Sub1.GetterTree;
  };
};

export type ActionTree = {
  todo: TodoActTree & {
    sub1: Sub1.ActionTree;
  };
};
