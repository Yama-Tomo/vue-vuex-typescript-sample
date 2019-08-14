/**
 * @jest-environment jsdom
 */

import { AxiosResponse } from 'axios';
import * as Nuxt from '@/types/nuxt';
import plugin from '@/plugins/axios_cookie_proxy';
import Mock = jest.Mock;

let target: Parameters<Nuxt.Context['app']['$axios']['onResponse']>[0];
const nuxtContextMock = () => ({
  $axios: {
    interceptors: {
      response: {
        use: (cb: typeof target) => {
          target = cb;
        },
      },
    },
    defaults: {
      headers: {
        common: {
          cookie: null,
        },
      },
    },
  },
  res: {
    setHeader: jest.fn(),
  },
});

beforeAll(() => {
  process.server = true;
});

afterAll(() => {
  process.server = false;
});

describe('レスポンスヘッダにcookieの値が存在しない場合', () => {
  test('cookieのセットが行われないこと', () => {
    const response: AxiosResponse<any> = {
      data: {},
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    };

    const context = (nuxtContextMock() as any) as Nuxt.Context;
    plugin(context);
    expect(target(response)).toBe(response);
    expect(context.$axios.defaults.headers.common.cookie).toBe(null);
    expect((context.res.setHeader as Mock).mock.calls.length).toBe(0);
  });
});

describe('レスポンスヘッダにcookieの値が存在する場合', () => {
  test('重複したキーがある場合は上書きしつつcookieのセットが行われること', () => {
    const response: AxiosResponse<any> = {
      data: {},
      status: 200,
      statusText: '',
      headers: {
        'set-cookie': [
          'key2=new-value; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
        ],
      },
      config: {},
    };

    const context = (nuxtContextMock() as any) as Nuxt.Context;
    context.res.getHeader = () => [
      'key1=xxxxxx; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
      'key2=yyyyyy; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
      'key3=zzzzzz; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
    ];

    plugin(context);
    expect(target(response)).toBe(response);
    expect(context.$axios.defaults.headers.common.cookie).toBe(
      'key2=new-value; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com; ' +
        'key1=xxxxxx; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com; ' +
        'key3=zzzzzz; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com'
    );
    expect((context.res.setHeader as Mock).mock.calls[0]).toEqual([
      'Set-Cookie',
      [
        'key2=new-value; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
        'key1=xxxxxx; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
        'key3=zzzzzz; expires=Sun, 07-Jul-2019 04:23:15 GMT; path=/; domain=.hogehoge.com',
      ],
    ]);
  });
});
