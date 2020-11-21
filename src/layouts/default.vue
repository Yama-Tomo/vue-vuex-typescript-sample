<template>
  <v-app>
    <v-app-bar app class="header">
      <v-toolbar-title> vuex tutorial with nuxt.js </v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-menu bottom left offset-y>
          <template #activator="{ on }">
            <v-btn text color="white" v-on="on"
              >contents<v-icon>{{ mdiMenuDown }}</v-icon></v-btn
            >
          </template>
          <v-list>
            <v-list-item :to="localePath('index')" nuxt exact>
              <v-list-item-title>{{ $t('link.home') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="localePath('about')" nuxt>
              <v-list-item-title>{{ $t('link.about') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :to="localePath('secret')" nuxt>
              <v-list-item-title>{{ $t('link.secret') }}</v-list-item-title>
            </v-list-item>

            <v-divider />

            <v-list-item
              v-if="!isLoggedIn"
              :to="localePath('login') + redirectParam"
              nuxt
            >
              <v-list-item-title>{{ $t('link.sign_in') }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="isLoggedIn"
              :href="localePath('logout') + redirectParam"
            >
              <v-list-item-title>{{ $t('link.sign_out') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-menu bottom left offset-y :min-width="200">
        <template #activator="{ on }">
          <v-btn color="#fafafa" icon v-on="on">
            <v-icon>{{ mdiWeb }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <template v-for="locale in locales">
            <v-list-item
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              nuxt
            >
              <v-list-item-title>{{ locale.code }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import * as vts from 'vue-tsx-support';
import { mdiMenuDown, mdiWeb } from '@mdi/js';
import { getState } from '@/store';

type Locales = { [key: string]: { [key: string]: string } };

const Component = Vue.extend({
  computed: {
    mdiMenuDown(): string {
      return mdiMenuDown;
    },
    mdiWeb(): string {
      return mdiWeb;
    },
    isLoggedIn(): boolean {
      return getState('auth', this.$store).loggedIn;
    },
    currentPath(): string {
      return this.$route.path;
    },
    redirectParam(): string {
      return '?redirect=' + encodeURIComponent(this.$route.fullPath);
    },
    locales(): Locales {
      return (this.$root.$i18n as any).locales as Locales;
    },
  },
  methods: {
    signout() {
      this.$auth.logout();
    },
  },
});

export default vts.ofType().convert(Component);
</script>

<style scoped lang="scss">
@import '../assets/css/variables';

.v-application.theme--light {
  background-color: white;
}

.v-app-bar.v-toolbar.header {
  background-color: $nuxt-color;
  color: white;
}
</style>
