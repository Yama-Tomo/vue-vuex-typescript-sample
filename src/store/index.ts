import Vuex from 'vuex';
import { stores } from '../namespace_maps';

export default function store() {
  return new Vuex.Store({
    modules: stores,
  });
}
