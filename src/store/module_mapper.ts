import * as Auth from '@/store/auth';
import * as Todo from '@/store/todo';

export type StateTree = Todo.StateTree & Auth.StateTree;

export type RootState = Todo.StateTree & Auth.StateTree;

export type GetterTree = Todo.GetterTree;

export type ActionTree = Todo.ActionTree;
