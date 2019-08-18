<template>
  <div>
    <h1>Secret</h1>
    This is secret page.
    <br />
    <br />
    your email address
    {{ email }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as StoreHelper from '@/store/helper';

@Component
export default class About extends Vue {
  get email(): string {
    return StoreHelper.getState('auth', this.$store).user.email;
  }
}
</script>
