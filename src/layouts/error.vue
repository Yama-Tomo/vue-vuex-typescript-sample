<template>
  <div>
    <h1 v-if="statusCode === 404">Sorry Not Found...</h1>
    <h1 v-else>Internal Server Error</h1>
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Nuxt } from '../types';

@Component
export default class About extends Vue {
  @Prop(Object)
  public error!: Nuxt.Error;

  get statusCode(): number { return this.error.statusCode; }
}
</script>
