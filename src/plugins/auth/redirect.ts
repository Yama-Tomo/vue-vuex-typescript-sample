import { NuxtContext } from '@/types';

export const redirect = {
  login: '/login',
  logout: '/logout',
  home: '/home',
};

export default (ctx: NuxtContext) => {
  ctx.app.$auth.onRedirect((to: string) => {
    if (to === redirect.login) {
      const redirectUrl = encodeURIComponent(ctx.route.fullPath);
      return `${ctx.app.localePath('login')}?redirect=${redirectUrl}`;
    }

    if (to === redirect.logout) {
      return ctx.app.localePath('index');
    }

    if (to === redirect.home) {
      if (ctx.query.redirect) {
        const redirectUrl = String(ctx.query.redirect);
        delete ctx.query.redirect;
        return redirectUrl;
      }

      return ctx.app.localePath('index');
    }

    return to;
  });
};
