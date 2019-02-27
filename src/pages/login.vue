<template>
  <div>
    <h1>login</h1>
    <form :action="currentPath" method="post" ref="form">
      <div class="error" v-if="isInvalid">
        email or password is incorrect
      </div>
      <div>
        <label>email</label><br>
        <input type="text" v-model="email" name="email">
      </div>
      <div>
        <label>Password</label><br>
        <input type="password" v-model="password" name="password">
      </div>
      <button @click="onSignInClick" :disabled="busy">sign in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import { StoreHelper, StoreHelperMixin } from '../mixins/store_helper';
import { AxiosError } from 'axios';
import { modules } from '../store_modules/module_mapper';
import { AuthState } from '../store_modules/auth/state';
import { Nuxt } from '@/types/nuxt';


interface PostParams { email: string; password: string; }

@Component({
  auth: false,
})
export default class Login extends mixins(StoreHelperMixin) {
  public email = '';
  public password = '';
  public isInvalid = false;
  public busy = false;

  public async asyncData(ctx: Nuxt.Context): Promise<Partial<Login>|void> {
    const authState: AuthState = StoreHelper.getState(ctx.store, modules.auth);
    if (authState.loggedIn) {
      ctx.app.$auth.redirect('home');
      return;
    }

    if (process.server && ctx.req.method === 'POST' && ctx.req.body !== null) {
      const postParams: PostParams = ctx.req.body as any;
      const data = {
        user: { email: postParams.email, password: postParams.password },
      };

      return ctx.app.$auth.loginWith('local', { data }).then(() => {
        return ctx.app.$auth.redirect('home');
      }).catch((error: AxiosError) => {
        return { email: postParams.email, isInvalid: true };
      });
    }
  }

  public onSignInClick() {
    this.busy = true;
    (this.$refs.form as HTMLFormElement).submit();
  }

  get currentPath(): string {
    return this.$route.fullPath;
  }

  get authState(): AuthState { return this.getState(modules.auth); }
}
</script>
<style lang="scss" scoped>
.error {
  color: #ff5458;
}
</style>

<style scoped lang="scss">
button {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15px;
  width: 110px;
  border-radius: 5px;
}
</style>
