<template>
  <div>
    <List :state="state" :actions="actions" :getters="getters" />
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { Store } from 'vuex';
import { StoreHelper, StoreHelperMixin, Actions } from '../mixins/store_helper';
import { modules } from '../store_modules/module_mapper';
import List from '../components/todo/list.vue';
import { TodoActions } from '../store_modules/todo/actions';

@Component({
  components: {
    List,
  },
  auth: false,
})
export default class Index extends mixins(StoreHelperMixin) {
  public async fetch({ store }: { store: Store<any> }) {
    const actions: Actions<TodoActions> = StoreHelper.getActions(
      store,
      modules.todo
    );
    await actions.fetchInitialState(undefined);
  }

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
