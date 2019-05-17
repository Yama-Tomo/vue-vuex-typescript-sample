// NOTE: .ts ファイルから .vueファイルをimportする際にこの型定義ファイルが必要
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
