<template>
  <List :state=state :actions=actions :getters=getters></List>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { StoreHelperMixin } from './mixins/store_helper';
import { modules } from './modules/module_mapper';
import List from './modules/todo/components/list.vue';

@Component({
  components: {
    List,
  },
})
export default class App extends Mixins(StoreHelperMixin) {
  get state() {
    return this.getState(modules.todo);
  }

  get actions() {
    return this.getActions(modules.todo);
  }

  get getters() {
    return this.getGetters(modules.todo);
  }
}
</script>
