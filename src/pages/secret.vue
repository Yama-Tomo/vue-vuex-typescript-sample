<script lang="tsx">
import Vue, { VNode } from 'vue';
import * as vts from 'vue-tsx-support';
import { getState } from '@/store';

const Component = Vue.extend({
  computed: {
    email(): string {
      return getState('auth', this.$store).user.email;
    },
  },
  render(): VNode {
    return (
      <div>
        <h1>Secret</h1>
        This is secret page.
        <br />
        <br />
        your email address
        {this.email}
      </div>
    );
  },
});

export default vts.ofType().convert(Component);
</script>
