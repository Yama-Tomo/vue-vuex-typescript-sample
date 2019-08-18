import { storiesOf } from '@storybook/vue';
import { VueConstructor } from 'vue';
import * as Helper from '../../helper';
import List from '@/components/todo/list.vue';
import * as StoreHelper from '@/store/helper';
import { State } from '@/store/todo';

const setup = (
  initState: State,
  extendCtx?: NonNullable<ConstructorParameters<VueConstructor>[0]>
) => {
  const store = Helper.store();
  store.commit('todo/setInitialState', initState);

  const actions = StoreHelper.getActions('todo', store);
  const getters = StoreHelper.getGetters('todo', store);
  const state = StoreHelper.getState('todo', store);

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
