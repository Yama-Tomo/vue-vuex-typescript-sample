<template>
  <div>
    <h1>About</h1>
    <a href="https://github.com/vuejs/vuex/tree/dev/examples/todomvc">https://github.com/vuejs/vuex/tree/dev/examples/todomvc</a>
    <ul>
      <li>
        typescript<br />
        <img src="~/assets/image/typescript_logo.png">
      </li>
      <li>
        nuxt.js<br />
        <img src="~/assets/image/nuxt_logo.png">
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
