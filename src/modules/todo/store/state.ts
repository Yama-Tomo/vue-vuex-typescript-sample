import Todo from './state/todo';
import {modules} from '@/namespace_maps';

export interface TodoState {
  todos: Todo[];
}

export default (): TodoState => ({
  todos: [],
});
