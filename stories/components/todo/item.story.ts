import { storiesOf } from '@storybook/vue';
import { VueConstructor } from 'vue';
import * as Helper from '../../helper';
import Item from '@/components/todo/item.vue';
import { StoreHelper } from '@/mixins/store_helper';
import * as Mapper from '@/store_modules/module_mapper';
import { TodoState } from '@/store_modules/todo';

const setup = (
  initState: TodoState,
  extendCtx?: NonNullable<ConstructorParameters<VueConstructor>[0]>
) => {
  const store = Helper.store();
  store.commit('todo/setInitialState', initState);

  const actions = StoreHelper.getActions(store, Mapper.modules.todo);
  const state = StoreHelper.getState(store, Mapper.modules.todo);

  return () => ({
    ...{
      components: { Item },
      template: '<Item :actions=actions :todo=todo />',
      store,
      data: () => ({ todo: state.todos[0], actions }),
      i18n: Helper.i18n(),
    },
    ...(extendCtx || {}),
  });
};

storiesOf('components.todo.item', module)
  .add('default', setup({ todos: [{ text: 'aaaa', done: true }] }))
  .add(
    'edit mode',
    setup(
      { todos: [{ text: 'bbbb', done: false }] },
      {
        mounted() {
          (this as any).$children[0].editing = 1;
        },
      }
    )
  );
