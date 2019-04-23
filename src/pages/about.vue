<template>
  <div>
    <h1>About</h1>
    <a href="https://github.com/vuejs/vuex/tree/dev/examples/todomvc"
      >https://github.com/vuejs/vuex/tree/dev/examples/todomvc</a
    >
    <h2>using libraries</h2>
    <ul>
      <li>
        typescript v3<br />
        <img src="~/assets/image/typescript_logo.png" />
      </li>
      <li>
        nuxt.js v2<br />
        <img src="~/assets/image/nuxt_logo.png" />
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
import { Vue, Component } from 'nuxt-property-decorator';
import ExternalLibWrapper from '@/utils/external_lib_wrapper';

@Component({
  auth: false,
})
export default class About extends Vue {
  public head() {
    return {
      script: [
        {
          src: 'https://code.jquery.com/jquery-3.4.0.js',
          integrity: 'sha256-DYZMCC8HTC+QDr5QNaIcfR7VSPtcISykd+6eSmBW5qo=',
          crossorigin: 'anonymous',
        },
      ],
    };
  }

  public async created() {
    if (this.$importJQuery) {
      await this.$importJQuery();
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      const jqueryVersion = ExternalLibWrapper.jquery.fn.jquery;
    }
  }
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
