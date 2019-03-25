<template>
  <div>
    <h1 v-if="statusCode === 404">
      Sorry Not Found...
    </h1>
    <h1 v-else>
      Internal Server Error
    </h1>
    <nuxt-link to="/">
      Home
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Nuxt } from '@/types/nuxt';

// NOTE: 直接 Nuxt.Errorをコンポーネント内で参照するとビルドが通らないので暫定対応
type Error = Nuxt.Error;

@Component
export default class About extends Vue {
  @Prop(Object)
  public error!: Error;

  get statusCode(): number { return this.error.statusCode; }
}
</script>
