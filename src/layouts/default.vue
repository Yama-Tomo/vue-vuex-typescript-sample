<template>
  <v-app>
    <v-app-bar app class="header">
      <v-toolbar-title>
        vuex tutorial with nuxt.js
      </v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-menu bottom left offset-y>
          <template v-slot:activator="{ on }">
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
        <template v-slot:activator="{ on }">
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
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { mdiMenuDown, mdiWeb } from '@mdi/js';
import * as StoreHelper from '@/store/helper';

type Locales = { [key: string]: { [key: string]: string } };

@Component
export default class DefaultLayout extends Vue {
  public signout() {
    this.$auth.logout();
  }

  get mdiMenuDown(): string {
    return mdiMenuDown;
  }

  get mdiWeb(): string {
    return mdiWeb;
  }

  get isLoggedIn(): boolean {
    return StoreHelper.getState('auth', this.$store).loggedIn;
  }

  get currentPath(): string {
    return this.$route.path;
  }

  get redirectParam(): string {
    return '?redirect=' + encodeURIComponent(this.$route.fullPath);
  }

  get locales(): Locales {
    return (this.$root.$i18n as any).locales as Locales;
  }
}
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
