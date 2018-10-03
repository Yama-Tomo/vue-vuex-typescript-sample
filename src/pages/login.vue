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
    <button @click="onLoginButtonClick">login</button>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Vue } from 'vue-property-decorator';
import { AxiosError } from 'axios';

@Component({
  auth: false,
})
export default class Login extends Vue {
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
