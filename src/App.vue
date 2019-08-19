<template>
  <List :state="state" :actions="actions" :getters="getters" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import List from './modules/todo/components/list.vue';
import * as StoreHelper from '@/modules/store_helper';

@Component({
  components: {
    List,
  },
})
export default class App extends Vue {
  get state() {
    return StoreHelper.getState('todoModule', this.$store);
  }

  get actions() {
    return StoreHelper.getActions('todoModule', this.$store);
  }

  get getters() {
    return StoreHelper.getGetters('todoModule', this.$store);
  }
}
</script>
