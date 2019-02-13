import { DefineGetters } from 'vuex-type-helper';
import { GlobalState } from './state';

export interface GlobalGetters {}

export const getters: DefineGetters<GlobalGetters, GlobalState> = {};
