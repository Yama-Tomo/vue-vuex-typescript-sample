import { Nuxt } from '@/types/nuxt';
import isNum from 'lodash/isNumber';

export default (ctx: Nuxt.Context) => {
  if (!process.server) {
    return;
  }

  ctx.$axios.interceptors.request.use(request => {
    // NOTE: nuxtに対してPOSTリクエストを送るとブラウザから送ったcontent-lengthを
    // バックエンドのAPIにそのままproxyしようとするのでリセット
    if (request.headers.common.hasOwnProperty('content-length')) {
      delete request.headers.common['content-length'];
    }

    return request;
  });

  ctx.$axios.interceptors.response.use(response => {
    const cookie: string[] | null = response.headers['set-cookie'];

    if (Array.isArray(cookie) && cookie.length) {
      // NOTE: バックエンドに通信した際に送られるcookieをそのままSSRのレスポンスにも乗っける
      const currentCookie = ctx.res.getHeader('Set-Cookie');

      if (currentCookie) {
        const castCurrentCookie = Array.isArray(currentCookie)
          ? currentCookie
          : isNum(currentCookie)
          ? [String(currentCookie)]
          : [currentCookie];

        (castCurrentCookie as (string | undefined)[])
          .filter(v => v)
          .forEach(v => {
            if (!v) {
              return;
            }

            const [key] = v.split('=');
            if (cookie.find(v => v.indexOf(key) < 0)) {
              cookie.push(v);
            }
          });
      }

      ctx.res.setHeader('Set-Cookie', cookie);
      // NOTE: 複数回，axiosを使った通信に対応するため送られてきたcookieをデフォルトのヘッダーに代入
      ctx.$axios.defaults.headers.common.cookie = cookie.join('; ');
    }

    return response;
  });
};
