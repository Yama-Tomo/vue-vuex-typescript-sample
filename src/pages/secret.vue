<template>
  <div>
    <h1>Secret</h1>
    This is secret page.
    <br>
    <br>
    your email address
    {{ email }}
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import { Mixins } from 'vue-mixin-decorator';
import * as ns from '../namespace_maps';
import { AuthState } from '../modules/auth/store/state';

@Component
export default class About extends Mixins<StoreHelperMixin>(StoreHelperMixin) {
  get email(): string {
    return (this.getState(ns.authModuleName) as AuthState).user.email;
  }
}
</script>