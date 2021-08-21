<script lang="tsx">
import Vue from 'vue';
import type { VNode } from 'vue';
import * as vts from 'vue-tsx-support';
import List from '@/modules/todo/components/list.vue';
import * as Store from '@/modules/store';

const Component = Vue.extend({
  computed: {
    state(): Store.RootState['todoModule'] {
      return Store.getState('todoModule', this.$store);
    },
    actions(): Store.ActionTree['todoModule'] {
      return Store.getActions('todoModule', this.$store);
    },
    getters(): Store.GetterTree['todoModule'] {
      return Store.getGetters('todoModule', this.$store);
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
