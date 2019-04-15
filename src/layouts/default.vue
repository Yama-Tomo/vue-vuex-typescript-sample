<template>
  <div>
    <header class="header">
      Vuex tutorial with typescript and Nuxt.js
    </header>
    <div class="signin">
      <nuxt-link
        v-if="!isLoggedIn && currentPath != localePath('login')"
        :to="toLoginWithRedirectParam"
      >
        {{ $t('link.sign_in') }}
      </nuxt-link>
      <a v-if="isLoggedIn" :href="localePath('logout')">{{
        $t('link.sign_out')
      }}</a>
    </div>
    <nuxt class="container" />
    <hr />
    <div class="container">
      <nuxt-link
        v-if="currentPath != localePath('index')"
        :to="localePath('index')"
      >
        {{ $t('link.home') }}
      </nuxt-link>
      <nuxt-link
        v-if="currentPath != localePath('about')"
        :to="localePath('about')"
      >
        {{ $t('link.about') }}
      </nuxt-link>
      <nuxt-link
        v-if="currentPath != localePath('secret')"
        :to="localePath('secret')"
      >
        {{ $t('link.secret') }}
      </nuxt-link>
      <br />
      {{ $t('other_lang') }}:
      <template v-for="locale in locales">
        <nuxt-link
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        >
          {{ locale.code }}
        </nuxt-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import { modules } from '../store_modules/module_mapper';
import { AuthState } from '../store_modules/auth/state';

type Locales = { [key: string]: { [key: string]: string } };

@Component
export default class DefaultLayout extends mixins(StoreHelperMixin) {
  public signout() {
    this.$auth.logout();
  }

  get isLoggedIn(): boolean {
    return (this.getState(modules.auth) as AuthState).loggedIn;
  }

  get currentPath(): string {
    return this.$route.path;
  }

  get toLoginWithRedirectParam(): string {
    return (
      this.localePath('login') +
      '?redirect=' +
      encodeURIComponent(this.$route.fullPath)
    );
  }

  get locales(): Locales {
    return (this.$root.$i18n as any).locales as Locales;
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variables';

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
