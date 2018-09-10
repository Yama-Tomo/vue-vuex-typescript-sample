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
    <hr />
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 150px;
}

li:not(:first-child) {
  margin-top: 10px;
}
</style>
