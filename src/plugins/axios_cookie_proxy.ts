import isNum from 'lodash/isNumber';
import { NuxtContext } from '@/types';

export default (ctx: NuxtContext) => {
  if (!process.server) {
    return;
  }

  // set the cookie that came from the browser
  ctx.$axios.onRequest((config) => {
    if (!('common' in config.headers)) {
      config.headers.common = { cookie: ctx.req.headers.cookie };
    } else {
      config.headers.common.cookie = ctx.req.headers.cookie;
    }
  });

  ctx.$axios.onResponse((response) => {
    const cookie: string[] | null = response.headers['set-cookie'];

    if (Array.isArray(cookie) && cookie.length) {
      // NOTE: バックエンドに通信した際に送られるcookieをそのままSSRのレスポンスにも乗っける
      const currentCookie = ctx.res.getHeader('Set-Cookie');

      if (currentCookie) {
        ((): (string | undefined)[] =>
          Array.isArray(currentCookie)
            ? currentCookie
            : isNum(currentCookie)
            ? [String(currentCookie)]
            : [currentCookie])().forEach((v) => {
          if (!v) {
            return;
          }

          const [key] = v.split('=');
          if (!cookie.some((v) => v.includes(key))) {
            cookie.push(v);
          }
        });
      }

      ctx.res.setHeader('Set-Cookie', cookie);
      // NOTE: 複数回，axiosを使った通信に対応するため送られてきたcookieをデフォルトのヘッダーに代入
      ctx.req.headers.cookie = cookie.join('; ');
    }

    return response;
  });
};
