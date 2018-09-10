<template>
  <div>
    <header class="header">Vuex tutorial with typescript and Nuxt.js</header>
    <nuxt class="container" />
  </div>
</template>

<style scoped lang="scss">
@import "../assets/css/variables";

.header {
  background-color: $nuxt-color;
  color: white;
  margin: 0px;
  padding: 10px;
  font-size: 20px;
}

.container {
  margin: 15px;
}
</style>
