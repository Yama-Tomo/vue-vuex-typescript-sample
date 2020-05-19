<template>
  <div>
    <List :state="state" :actions="actions" :getters="getters" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Store } from 'vuex';
import List from '../components/todo/list/index.vue';
import * as StoreHelper from '@/store/helper';

@Component({
  components: {
    List,
  },
  auth: false,
})
export default class Index extends Vue {
  public async fetch({ store }: { store: Store<any> }) {
    const actions = StoreHelper.getActions('todo', store);
    await actions.fetchInitialState();
  }

  get state() {
    return StoreHelper.getState('todo', this.$store);
  }

  get actions() {
    return StoreHelper.getActions('todo', this.$store);
  }

  get getters() {
    return StoreHelper.getGetters('todo', this.$store);
  }
}
</script>
