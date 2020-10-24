import 'vue-tsx-support/enable-check';

declare global {
  namespace JSX {
    // eslint-disable-next-line no-undef
    interface Element extends VNode {}
    // eslint-disable-next-line no-undef
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
