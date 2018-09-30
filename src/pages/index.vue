<i18n src="~/locales/pages/index/ja.yml"></i18n>
<i18n src="~/locales/pages/index/en.yml"></i18n>
<template>
  <div>
    <List :state=state :actions=actions :getters=getters :i18n="$i18n"></List>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Mixins } from 'vue-mixin-decorator';
import { StoreHelper, StoreHelperMixin, Actions } from '../mixins/store_helper';
import * as ns from '../namespace_maps';
import List from '../modules/todo/components/list.vue';
import { TodoActions } from '../modules/todo/store/actions';
import { initialStateResolver } from '../modules/todo/store/index';
import { Store } from 'vuex';

@Component({
  components: {
    List,
  },
  auth: false,
})
export default class Index extends Mixins<StoreHelperMixin>(StoreHelperMixin) {
  public fetch({ store }: { store: Store<any> }) {
    return new Promise((resolve: () => void, reject: () => void) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).then(() => {
      const state = initialStateResolver({ todos: [
        { text: 'aaaa', done: false },
        { text: 'bbbb', done: true },
      ]});
      const actions: Actions<TodoActions> = StoreHelper.getActions(store, ns.todoModuleName);
      actions.setFullState(state);
    });
  }

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

