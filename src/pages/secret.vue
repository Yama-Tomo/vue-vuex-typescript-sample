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
import { modules } from '../store_modules/module_mapper';
import { AuthState } from '../store_modules/auth/state';

@Component
export default class About extends mixins(StoreHelperMixin) {
  get email(): string {
    return (this.getState(modules.auth) as AuthState).user.email;
  }
}
</script>
