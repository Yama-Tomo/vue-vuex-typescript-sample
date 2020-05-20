<script lang="tsx">
import Vue, { VNode } from 'vue';
import * as vts from 'vue-tsx-support';
import * as StoreHelper from '@/store/helper';
import List from '@/components/todo/list/index.vue';
import { ActionTree, StateTree, GetterTree } from '@/store/module_mapper';
import * as Nuxt from '@/types/nuxt';

const Component = Vue.extend({
  auth: false,
  async fetch({ store }: Nuxt.Context) {
    const actions = StoreHelper.getActions('todo', store);
    await actions.fetchInitialState();
  },
  computed: {
    state(): StateTree['todo'] {
      return StoreHelper.getState('todo', this.$store);
    },
    actions(): ActionTree['todo'] {
      return StoreHelper.getActions('todo', this.$store);
    },
    getters(): GetterTree['todo'] {
      return StoreHelper.getGetters('todo', this.$store);
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
