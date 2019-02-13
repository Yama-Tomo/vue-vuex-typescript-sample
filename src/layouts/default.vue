<i18n src="~/locales/ja.yml"></i18n>
<i18n src="~/locales/en.yml"></i18n>
<template>
  <div>
    <header class="header">Vuex tutorial with typescript and Nuxt.js</header>
    <div class="signin">
      <nuxt-link :to="toLoginWithRedirectParam" v-if="!isLoggedIn && currentPath != localePath('login')">{{ $t('link.sign_in') }}</nuxt-link>
      <a href="" @click.prevent="signout" v-if="isLoggedIn">{{ $t('link.sign_out') }}</a>
    </div>
    <nuxt class="container" />
    <hr />
    <div class="container">
      <nuxt-link :to="localePath('index')" v-if="currentPath != localePath('index')">{{ $t('link.home') }}</nuxt-link>
      <nuxt-link :to="localePath('about')" v-if="currentPath != localePath('about')">{{ $t('link.about') }}</nuxt-link>
      <nuxt-link :to="localePath('secret')" v-if="currentPath != localePath('secret')">{{ $t('link.secret') }}</nuxt-link>
      <br>
      {{ $t('other_lang') }}:
      <nuxt-link
        v-for="locale in locales"
        v-if="locale.code !== $i18n.locale"
        :key="locale.code"
        :to="switchLocalePath(locale.code)">{{ locale.code }}</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import * as ns from '../namespace_maps';
import { AuthState } from '../store_modules/auth/store/state';

@Component
export default class DefaultLayout extends mixins(StoreHelperMixin) {
  public signout() {
    this.$auth.logout();
  }

  get isLoggedIn(): boolean {
    return (this.getState(ns.authModuleName) as AuthState).loggedIn;
  }

  get currentPath(): string {
    return this.$route.path;
  }

  get toLoginWithRedirectParam(): string {
    return this.localePath('login') + '?redirect=' + encodeURIComponent(this.$route.fullPath);
  }

  get locales(): {[key: string]: {[key: string]: string}} {
    return (this.$root.$i18n as any).locales as {[key: string]: {[key: string]: string}};
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
  float: right;
  text-align: right;
  margin-top: 10px;
  margin-right: 15px;
}
</style>
