<template>
  <div>
    <header class="header">Vuex tutorial with typescript and Nuxt.js</header>
    <div class="signin">
      <nuxt-link to="/login" v-if="!isLoggedIn">sign in</nuxt-link>
      <a href="" @click.prevent="signout" v-if="isLoggedIn">sign out</a>
    </div>
    <nuxt class="container" />
    <hr />
    <div class="container">
      <nuxt-link to="/" v-if="currentPath != '/'">home</nuxt-link>
      <nuxt-link to="/about" v-if="currentPath != '/about'">about</nuxt-link>
      <nuxt-link to="/secret" v-if="currentPath != '/secret' && isLoggedIn">secret</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
/// <reference types="vue-router" />
import Component from 'nuxt-class-component';
import { Mixins } from 'vue-mixin-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import * as ns from '../namespace_maps';
import { AuthState } from '../modules/auth/store/state';

@Component
export default class DefaultLayout extends Mixins<StoreHelperMixin>(StoreHelperMixin) {
  public signout() {
    this.$auth.logout().then(() => this.$auth.redirect('home'));
  }

  get isLoggedIn(): boolean {
    return (this.getState(ns.authModuleName) as AuthState).loggedIn;
  }

  get currentPath(): string {
    return this.$route.path;
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
  margin-right: 5px;
}
</style>
