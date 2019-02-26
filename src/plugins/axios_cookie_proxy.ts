import { Nuxt } from '@/types/nuxt';

export default async (ctx: Nuxt.Context) => {
  if (!process.server) {
    return;
  }

  ctx.$axios.interceptors.request.use((request) => {
    // NOTE: nuxtに対してPOSTリクエストを送るとブラウザから送ったcontent-lengthを
    // バックエンドのAPIにそのままproxyしようとするのでリセット
    if (request.headers.common.hasOwnProperty('content-length')) {
      delete request.headers.common['content-length'];
    }

    return request;
  });

  ctx.$axios.interceptors.response.use((response) => {
    const cookie: string[]|null = response.headers['set-cookie'];

    if (cookie && cookie.length) {
      // NOTE: バックエンドに通信した際に送られるcookieをそのままSSRのレスポンスにも乗っける
      ctx.res.setHeader('Set-Cookie', cookie);
      // NOTE: 複数回，axiosを使った通信に対応するため送られてきたcookieをデフォルトのヘッダーに代入
      ctx.$axios.defaults.headers.common.cookie = cookie;
    }

    return response;
  });
};
