import { Nuxt } from '@/types/nuxt';

export default (ctx: Nuxt.Context) => {
  ctx.app.$auth.options.redirect = {
    logout: (context: Nuxt.Context) => context.app.localePath('index'),
    login: (context: Nuxt.Context) => {
      return `${context.app.localePath('login')}?redirect=${encodeURIComponent(context.route.fullPath)}`;
    },
    home: (context: Nuxt.Context) => context.query.redirect ? context.query.redirect : context.app.localePath('index'),
  };
};
