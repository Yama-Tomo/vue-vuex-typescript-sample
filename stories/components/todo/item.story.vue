<script lang="tsx">
import { storiesOf } from '@storybook/vue';
import Vue, { VueConstructor } from 'vue';
import Item from '@/components/todo/item.vue';
import * as StoreHelper from '@/store/helper';
import { State } from '@/store/todo';

type ItemComponent = InstanceType<typeof Item>;

type VueOpts = ConstructorParameters<VueConstructor>[0];
const setup = (initState: () => State, extendCtx?: VueOpts) => () => ({
  render(this: Vue) {
    const actions = StoreHelper.getActions('todo', this.$store);
    const state = StoreHelper.getState('todo', this.$store);

    return <Item actions={actions} todo={state.todos[0]} />;
  },
  beforeCreate(this: Vue) {
    this.$store.commit('todo/setInitialState', initState());
  },
  ...(extendCtx || {}),
});

storiesOf('components.todo.item', module)
  .add(
    'default',
    setup(() => ({ todos: [{ text: 'aaaa', done: true }] }))
  )
  .add(
    'edit mode',
    setup(() => ({ todos: [{ text: 'bbbb', done: false }] }), {
      mounted(this: Vue) {
        (this.$children[0] as ItemComponent).editing = true;
      },
    })
  );
</script>
