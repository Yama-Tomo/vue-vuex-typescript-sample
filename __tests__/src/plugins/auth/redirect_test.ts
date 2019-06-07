/**
 * @jest-environment jsdom
 */

import { Nuxt } from '@/types/nuxt';
import plugin, { redirect } from '@/plugins/auth/redirect';

let target: Parameters<Nuxt.Context['app']['$auth']['onRedirect']>[0];
const nuxtContextMock = () => ({
  app: {
    $auth: {
      onRedirect: (cb: typeof target) => {
        target = cb;
      },
    },
    localePath: (arg: string) => `/path/to/${arg}`,
  },
  route: {
    fullPath: '/path/to/hoge',
  },
  query: {
    redirect: '/path/to/before',
  },
});

test('beforeのURIがリダイレクトの設定にマッチしない場合はそのままTOのURIが返ること', () => {
  plugin((nuxtContextMock() as any) as Nuxt.Context);
  expect(target('to-uri', 'from-uri')).toBe('to-uri');
});

describe('beforeのURIがログインの場合', () => {
  test('redirectパラメータがついたURIを返すこと', () => {
    plugin((nuxtContextMock() as any) as Nuxt.Context);
    expect(target(redirect.login, 'from-uri')).toBe(
      '/path/to/login?redirect=%2Fpath%2Fto%2Fhoge'
    );
  });
});

describe('beforeのURIがログアウトの場合', () => {
  test('TOPのURIを返すこと', () => {
    plugin((nuxtContextMock() as any) as Nuxt.Context);
    expect(target(redirect.logout, 'from-uri')).toBe('/path/to/index');
  });
});

describe('beforeのURIがTOPの場合', () => {
  describe('redirectのクエリストリングがある場合', () => {
    test('クエリストリングのURIを返し context内のqueryオブジェクトからredirectのキーが削除されていること', () => {
      const context = (nuxtContextMock() as any) as Nuxt.Context;
      plugin(context);
      expect(target(redirect.home, 'from-uri')).toBe('/path/to/before');
      expect(context.query.hasOwnProperty('redirect')).toBeFalsy();
    });
  });

  describe('redirectのクエリストリングがない場合', () => {
    test('TOPのURIを返すこと', () => {
      const context = (nuxtContextMock() as any) as Nuxt.Context;
      delete context.query.redirect;

      plugin(context);
      expect(target(redirect.home, 'from-uri')).toBe('/path/to/index');
    });
  });
});
