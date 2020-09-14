<template>
  <div>
    <h1 v-if="statusCode === 404">Sorry Not Found...</h1>
    <h1 v-else>Internal Server Error</h1>
    <nuxt-link to="/"> Home </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import * as vts from 'vue-tsx-support';
import { NuxtError } from '@/types';

const Component = Vue.extend({
  props: {
    error: { type: Object as PropType<NuxtError>, default: undefined },
  },
  computed: {
    statusCode(): number {
      return this.error.statusCode;
    },
  },
});

export default vts.ofType().convert(Component);
</script>
