<template>
  <div>
    <h1>login</h1>
    <div>
      <label>User Name</label><br>
      <input type="text" v-model="username">
    </div>
    <div>
      <label>Password</label><br>
      <input type="password" v-model="password">
    </div>
    <button @click="onLoginButtonClick">login</button>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Vue } from 'vue-property-decorator';

@Component({
  auth: false,
})
export default class Login extends Vue {
  public username = '';
  public password = '';

  public onLoginButtonClick() {
    this.$auth.loginWith('local', { data: {
      user: {
        email: this.username,
        password: this.password,
      },
    }}).then(() => this.$auth.redirect('home'));
  }
}
</script>

<style scoped lang="scss">
button {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15px;
  width: 110px;
  border-radius: 5px;
}
</style>
