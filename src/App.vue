<template>
  <List :state=state :actions=actions :getters=getters></List>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { StoreHelperMixin } from './mixins/store_helper';
import * as ns from './namespace_maps';
import List from './modules/todo/components/list.vue';

@Component({
  components: {
    List,
  },
})
export default class App extends Mixins(StoreHelperMixin) {
  get state() {
    return this.getState(ns.todoModuleName);
  }

  get actions() {
    return this.getActions(ns.todoModuleName);
  }

  get getters() {
    return this.getGetters(ns.todoModuleName);
  }
}
</script>
