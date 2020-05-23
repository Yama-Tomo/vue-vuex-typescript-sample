<script lang="ts">
import Vue from 'vue';
import * as vts from 'vue-tsx-support';
import { NuxtContext } from '@/types';

const Component = Vue.extend({
  auth: false,
  async fetch(ctx: NuxtContext) {
    await ctx.app.$auth.logout();
    ctx.app.$auth.redirect('home');
  },
});

export default vts.ofType().convert(Component);
</script>
