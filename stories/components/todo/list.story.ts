import { storiesOf } from '@storybook/vue';
import { VueConstructor } from 'vue';
import * as Helper from '../../helper';
import List from '@/components/todo/list.vue';
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
  const getters = StoreHelper.getGetters(store, Mapper.modules.todo);
  const state = StoreHelper.getState(store, Mapper.modules.todo);

  return () => ({
    ...{
      components: { List },
      template: '<List :state=state :actions=actions :getters=getters />',
      store,
      data: () => ({ state, actions, getters }),
      i18n: Helper.i18n(),
      router: Helper.router(),
    },
    ...(extendCtx || {}),
  });
};

storiesOf('components.todo.list', module)
  .add(
    'default',
    setup({
      todos: [{ text: 'aaaa', done: true }, { text: 'bbbb', done: false }],
    })
  )
  .add('empty data', setup({ todos: [] }))
  .add(
    'all done todo',
    setup({
      todos: [{ text: 'aaaa', done: true }, { text: 'bbbb', done: true }],
    })
  );
