import * as Todo from './todo/store';

export { module as TodoModule } from '@/modules/todo/store';

export type RootState = Todo.StateTree;

export type GetterTree = Todo.GetterTree;

export type ActionTree = Todo.ActionTree;
