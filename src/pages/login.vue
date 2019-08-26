<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="6">
      <h1>login</h1>
      <v-form
        ref="form"
        v-model="valid"
        :action="currentPath"
        method="post"
        @submit="valid = false"
      >
        <v-alert v-if="isLoginIncorrect" type="error">
          email or password is incorrect
        </v-alert>
        <v-text-field
          v-model="email"
          label="E-mail"
          name="email"
          :rules="validationRules('name')"
          required
        />
        <v-text-field
          v-model="password"
          type="password"
          label="password"
          name="password"
          :rules="validationRules('password')"
          required
        />
        <div class="btn-box">
          <v-btn color="primary" type="submit" :disabled="!valid">
            sign in
          </v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import * as StoreHelper from '@/store/helper';
import * as Nuxt from '@/types/nuxt';

interface PostParams {
  email: string;
  password: string;
}

@Component({
  auth: false,
})
export default class Login extends Vue {
  public email = '';
  public password = '';
  public isLoginIncorrect = false;
  public valid = false;

  public asyncData(ctx: Nuxt.Context): Promise<Partial<Login> | void> | void {
    const authState = StoreHelper.getState('auth', ctx.store);
    if (authState.loggedIn) {
      ctx.app.$auth.redirect('home');
      return;
    }

    if (process.server && ctx.req.method === 'POST' && ctx.req.body !== null) {
      const postParams: PostParams = ctx.req.body as any;
      const data = {
        user: { email: postParams.email, password: postParams.password },
      };

      return ctx.app.$auth
        .loginWith('local', { data })
        .then(() => {
          return ctx.app.$auth.redirect('home');
        })
        .catch(() => {
          return { email: postParams.email, isLoginIncorrect: true };
        });
    }
  }

  public validationRules(propName: string) {
    return [(v: string): boolean | string => !!v || `${propName} is required`];
  }

  get currentPath(): string {
    return this.$route.fullPath;
  }

  get authState() {
    return StoreHelper.getState('auth', this.$store);
  }
}
</script>

<style lang="scss" scoped>
form {
  margin-top: 16px;

  .btn-box {
    text-align: right;
  }
}
</style>
