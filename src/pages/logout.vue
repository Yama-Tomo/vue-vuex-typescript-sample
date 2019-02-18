<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Nuxt } from '@/index';

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
