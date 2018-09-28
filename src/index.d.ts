import Vue, { ComponentOptions } from 'vue';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    auth?: boolean;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $auth: {
      loginWith: (strategy: string, params: any) => Promise<any>;
      redirect: (name: string, noRouter?: Boolean) => void;
      logout: () => Promise<any>;
    };
  }
}
