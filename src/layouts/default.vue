<template>
  <div>
    <header class="header">Vuex tutorial with typescript and Nuxt.js</header>
    <div class="signin">
      <nuxt-link to="/login" v-if="!isLoggedIn">sign in</nuxt-link>
    </div>
    <nuxt class="container" />
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Mixins } from 'vue-mixin-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import * as ns from '../namespace_maps';
import { AuthState } from '../modules/auth/store/state';

@Component
export default class DefaultLayout extends Mixins<StoreHelperMixin>(StoreHelperMixin) {
  get isLoggedIn(): boolean {
    return (this.getState(ns.authModuleName) as AuthState).loggedIn;
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variables";

.header {
  background-color: $nuxt-color;
  color: white;
  margin: 0px;
  padding: 10px;
  font-size: 20px;
}

.container {
  margin: 15px;
}

.signin {
  text-align: right;
}
</style>
