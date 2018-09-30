<template>
  <div>
    <h1>About</h1>
    <a href="https://github.com/vuejs/vuex/tree/dev/examples/todomvc">https://github.com/vuejs/vuex/tree/dev/examples/todomvc</a>
    <h2>using libraries</h2>
    <ul>
      <li>
        typescript v3<br />
        <img src="~/assets/image/typescript_logo.png">
      </li>
      <li>
        nuxt.js v2<br />
        <img src="~/assets/image/nuxt_logo.png">
      </li>
      <li>
        <a href="https://github.com/nuxt-community/auth-module">@nuxtjs/auth</a>
      </li>
      <li>
        <a href="https://github.com/nuxt-community/nuxt-i18n">nuxt-i18n</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Component from 'nuxt-class-component';
import { Vue } from 'vue-property-decorator';

@Component({
  auth: false,
})
export default class About extends Vue {
}
</script>

<style scoped lang="scss">
img {
  max-width: 150px;
}

li:not(:first-child) {
  margin-top: 10px;
}
</style>
