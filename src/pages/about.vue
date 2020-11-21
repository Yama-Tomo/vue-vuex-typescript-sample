<template>
  <div>
    <h1>About</h1>
    <a href="https://github.com/vuejs/vuex/tree/dev/examples/todomvc">
      https://github.com/vuejs/vuex/tree/dev/examples/todomvc
    </a>
    <v-divider></v-divider>
    <v-list subheader two-line>
      <v-subheader>using libraries</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>typescript</v-list-item-title>
          <v-list-item-subtitle
            ><img src="~/assets/image/typescript_logo.png"
          /></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>nuxt.js</v-list-item-title>
          <v-list-item-subtitle
            ><img src="~/assets/image/nuxt_logo.png"
          /></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>@nuxtjs/auth</v-list-item-title>
          <v-list-item-subtitle>
            <a href="https://github.com/nuxt-community/auth-module">github</a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>nuxt-i18n</v-list-item-title>
          <v-list-item-subtitle>
            <a href="https://github.com/nuxt-community/nuxt-i18n">github</a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import * as vts from 'vue-tsx-support';
import ExternalLibWrapper from '@/utils/external_lib_wrapper';
import { NuxtError } from '@/types';

const Component = Vue.extend({
  auth: false,
  props: {
    error: { type: Object as PropType<NuxtError>, default: undefined },
  },
  head() {
    return {
      script: [
        {
          src: 'https://code.jquery.com/jquery-3.4.0.js',
          integrity: 'sha256-DYZMCC8HTC+QDr5QNaIcfR7VSPtcISykd+6eSmBW5qo=',
          crossorigin: 'anonymous',
        },
      ],
    };
  },
  computed: {
    statusCode(): number {
      return this.error.statusCode;
    },
  },
  async created() {
    if (this.$importJQuery) {
      await this.$importJQuery();
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      const jqueryVersion = ExternalLibWrapper.jquery.fn.jquery;
    }
  },
});

export default vts.ofType().convert(Component);
</script>

<style scoped lang="scss">
.v-divider {
  margin-top: 16px;
  margin-bottom: 16px;
}

.v-list > div {
  padding: 0;
}

img {
  max-width: 150px;
}
</style>
