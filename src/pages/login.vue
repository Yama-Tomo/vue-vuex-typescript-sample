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
import Vue from 'vue';
import * as vts from 'vue-tsx-support';
import { StateTree, getState } from '@/store';
import { NuxtContext } from '@/types';

type LocalState = {
  email: string;
  password: string;
  isLoginIncorrect: boolean;
  valid: boolean;
};

const Component = Vue.extend({
  auth: false,
  asyncData(ctx: NuxtContext): Promise<Partial<LocalState> | void> | void {
    const authState = getState('auth', ctx.store);
    if (authState.loggedIn) {
      ctx.app.$auth.redirect('home');
      return;
    }

    if (process.server && ctx.req.method === 'POST' && ctx.req.body !== null) {
      const postParams: Pick<LocalState, 'email' | 'password'> = ctx.req
        .body as any;
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
  },
  data(): LocalState {
    return {
      email: '',
      password: '',
      isLoginIncorrect: false,
      valid: false,
    };
  },
  computed: {
    currentPath(): string {
      return this.$route.fullPath;
    },
    authState(): StateTree['auth'] {
      return getState('auth', this.$store);
    },
  },
  methods: {
    validationRules(propName: string) {
      return [
        (v: string): boolean | string => !!v || `${propName} is required`,
      ];
    },
  },
});

export default vts.ofType().convert(Component);
</script>

<style lang="scss" scoped>
form {
  margin-top: 16px;

  .btn-box {
    text-align: right;
  }
}
</style>
