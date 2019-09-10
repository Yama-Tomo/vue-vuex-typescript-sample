import { storiesOf } from '@storybook/vue';
import Vue, { VueConstructor } from 'vue';
import Item from '@/components/todo/item.vue';
import * as StoreHelper from '@/store/helper';
import { State } from '@/store/todo';

type VueOpts = ConstructorParameters<VueConstructor>[0];
const setup = (initState: () => State, extendCtx?: VueOpts) => () => ({
  components: { Item },
  template: '<Item :actions=actions :todo=todo />',
  data(this: Vue) {
    const actions = StoreHelper.getActions('todo', this.$store);
    const state = StoreHelper.getState('todo', this.$store);

    return { todo: state.todos[0], actions };
  },
  beforeCreate(this: Vue) {
    this.$store.commit('todo/setInitialState', initState());
  },
  ...(extendCtx || {}),
});

storiesOf('components.todo.item', module)
  .add('default', setup(() => ({ todos: [{ text: 'aaaa', done: true }] })))
  .add(
    'edit mode',
    setup(() => ({ todos: [{ text: 'bbbb', done: false }] }), {
      mounted() {
        (this as any).$children[0].editing = 1;
      },
    })
  );
