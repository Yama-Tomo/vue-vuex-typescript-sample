import { storiesOf } from '@storybook/vue';
import * as Helper from '../../helper';
import Item from '@/components/todo/item.vue';
import { StoreHelper } from '@/mixins/store_helper';
import * as Mapper from '@/store_modules/module_mapper';
import { TodoState } from '@/store_modules/todo';

storiesOf('components.todo.item', module).add('default', () => {
  const store = Helper.store();
  const initialState: TodoState = { todos: [{ text: 'aaaa', done: true }] };
  store.commit('todo/setInitialState', initialState);

  const actions = StoreHelper.getActions(store, Mapper.modules.todo);
  const state = StoreHelper.getState(store, Mapper.modules.todo);

  return {
    components: { Item },
    template: '<Item :actions=actions :todo=todo />',
    store,
    data: () => ({
      todo: state.todos[0],
      actions,
    }),
    i18n: Helper.i18n(),
  };
});
