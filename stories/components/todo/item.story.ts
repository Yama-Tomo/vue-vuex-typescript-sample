import { storiesOf } from '@storybook/vue';
import * as Helper from '../../helper';
import Item from '@/components/todo/item.vue';
import { StoreHelper } from '@/mixins/store_helper';
import * as Mapper from '@/store_modules/module_mapper';
import { TodoState } from '@/store_modules/todo';

const setup = (state: TodoState) => {
  const store = Helper.store();
  store.commit('todo/setInitialState', state);

  return [
    store,
    StoreHelper.getActions(store, Mapper.modules.todo),
    StoreHelper.getState(store, Mapper.modules.todo),
  ] as const;
};

storiesOf('components.todo.item', module)
  .add('default', () => {
    const [store, actions, state] = setup({
      todos: [{ text: 'aaaa', done: true }],
    });

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
  })
  .add('edit mode', () => {
    const [store, actions, state] = setup({
      todos: [{ text: 'bbbb', done: false }],
    });

    return {
      components: { Item },
      template: '<Item :actions=actions :todo=todo />',
      store,
      data: () => ({
        todo: state.todos[0],
        actions,
      }),
      mounted() {
        (this as any).$children[0].editing = 1;
      },
      i18n: Helper.i18n(),
    };
  });
