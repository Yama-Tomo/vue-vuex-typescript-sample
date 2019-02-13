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
import { Component, mixins } from 'nuxt-property-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import * as ns from '../namespace_maps';
import { AuthState } from '../store_modules/auth/state';

@Component
export default class About extends mixins(StoreHelperMixin) {
  get email(): string {
    return (this.getState(ns.authModuleName) as AuthState).user.email;
  }
}
</script>