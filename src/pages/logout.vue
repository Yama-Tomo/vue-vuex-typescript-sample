<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as Nuxt from '@/types/nuxt';

@Component({
  auth: false,
})
export default class DefaultLayout extends Vue {
  public async fetch(ctx: Nuxt.Context) {
    await ctx.app.$auth.logout();
    ctx.app.$auth.redirect('home');
  }
}
</script>
