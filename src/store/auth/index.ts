import { State } from './state';

export interface StateTree {
  auth: State;
}

export type RootState = Pick<StateTree, 'auth'>;
