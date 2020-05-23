<script lang="tsx">
import Vue, { VNode } from 'vue';
import * as vts from 'vue-tsx-support';
import List from '@/components/todo/list/index.vue';
import * as Nuxt from '@/types/nuxt';
import {
  ActionTree,
  StateTree,
  GetterTree,
  getActions,
  getState,
  getGetters,
} from '@/store';

const Component = Vue.extend({
  auth: false,
  async fetch({ store }: Nuxt.Context) {
    const actions = getActions('todo', store);
    await actions.fetchInitialState();
  },
  computed: {
    state(): StateTree['todo'] {
      return getState('todo', this.$store);
    },
    actions(): ActionTree['todo'] {
      return getActions('todo', this.$store);
    },
    getters(): GetterTree['todo'] {
      return getGetters('todo', this.$store);
    },
  },
  render(): VNode {
    return (
      <div>
        <List
          state={this.state}
          actions={this.actions}
          getters={this.getters}
        />
      </div>
    );
  },
});

export default vts.ofType().convert(Component);
</script>
