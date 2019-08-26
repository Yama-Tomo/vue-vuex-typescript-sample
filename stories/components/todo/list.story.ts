import { storiesOf } from '@storybook/vue';
import Vue, { VueConstructor } from 'vue';
import List from '@/components/todo/list.vue';
import * as StoreHelper from '@/store/helper';
import { State } from '@/store/todo';

const setup = (
  initState: State,
  extendCtx?: NonNullable<ConstructorParameters<VueConstructor>[0]>
) => () => ({
  ...{
    components: { List },
    template: '<List :state=state :actions=actions :getters=getters />',
    data(this: Vue) {
      const actions = StoreHelper.getActions('todo', this.$store);
      const getters = StoreHelper.getGetters('todo', this.$store);
      const state = StoreHelper.getState('todo', this.$store);

      return { actions, getters, state };
    },
    beforeCreate(this: Vue) {
      this.$store.commit('todo/setInitialState', initState);
    },
  },
  ...(extendCtx || {}),
});

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
