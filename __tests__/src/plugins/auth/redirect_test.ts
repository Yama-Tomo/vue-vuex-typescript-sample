/**
 * @jest-environment jsdom
 */

import { NuxtContext } from '@/types';
import plugin, { redirect } from '@/plugins/auth/redirect';

let target: Parameters<NuxtContext['app']['$auth']['onRedirect']>[0];
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
  plugin((nuxtContextMock() as any) as NuxtContext);
  expect(target('to-uri', 'from-uri')).toBe('to-uri');
});

describe('beforeのURIがログインの場合', () => {
  test('redirectパラメータがついたURIを返すこと', () => {
    plugin((nuxtContextMock() as any) as NuxtContext);
    expect(target(redirect.login, 'from-uri')).toBe(
      '/path/to/login?redirect=%2Fpath%2Fto%2Fhoge'
    );
  });
});

describe('beforeのURIがログアウトの場合', () => {
  test('TOPのURIを返すこと', () => {
    plugin((nuxtContextMock() as any) as NuxtContext);
    expect(target(redirect.logout, 'from-uri')).toBe('/path/to/index');
  });
});

describe('beforeのURIがTOPの場合', () => {
  describe('redirectのクエリストリングがある場合', () => {
    test('クエリストリングのURIを返し context内のqueryオブジェクトからredirectのキーが削除されていること', () => {
      const context = (nuxtContextMock() as any) as NuxtContext;
      plugin(context);
      expect(target(redirect.home, 'from-uri')).toBe('/path/to/before');
      expect('redirect' in context.query).toBeFalsy();
    });
  });

  describe('redirectのクエリストリングがない場合', () => {
    test('TOPのURIを返すこと', () => {
      const context = (nuxtContextMock() as any) as NuxtContext;
      delete context.query.redirect;

      plugin(context);
      expect(target(redirect.home, 'from-uri')).toBe('/path/to/index');
    });
  });
});
