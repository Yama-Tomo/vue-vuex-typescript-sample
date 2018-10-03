<template>
  <div>
    <h1>login</h1>
    <div class="error" v-if="isInvalid">
      email or password is incorrect
    </div>
    <div>
      <label>email</label><br>
      <input type="text" v-model="email">
    </div>
    <div>
      <label>Password</label><br>
      <input type="password" v-model="password">
    </div>
    <button @click="onLoginButtonClick" :disabled="isAuthenticateProgress">
      <template v-if="isAuthenticateProgress">
        checking...
      </template>
      <template v-else>
        sign in
      </template>
    </button>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Mixins } from 'vue-mixin-decorator';
import { StoreHelperMixin } from '../mixins/store_helper';
import { AxiosError } from 'axios';
import * as ns from '../namespace_maps';
import { AuthState } from '../modules/auth/store/state';

@Component({
  auth: false,
})
export default class Login extends Mixins<StoreHelperMixin>(StoreHelperMixin) {
  public email = '';
  public password = '';
  public isInvalid = false;

  public onLoginButtonClick() {
    this.isInvalid = false;
    this.$auth.loginWith('local', { data: {
      user: {
        email: this.email,
        password: this.password,
      },
    }})
    .then(() => this.$auth.redirect('home'))
    .catch((data: AxiosError) => {
       if (data.response && data.response.status === 401) {
         this.isInvalid = true;
       }
    });
  }

  get authState(): AuthState { return this.getState(ns.authModuleName); }
  get isAuthenticateProgress(): boolean { return this.authState.busy; }
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
