import * as _ from 'lodash';

export type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;

export const isObject = (arg: unknown): arg is Record<string, any> =>
  _.isObject(arg);

export function hasKey<T extends string[]>(
  arg: unknown,
  keys: T
): arg is Record<Unpacked<T>, unknown>;

// eslint-disable-next-line no-redeclare
export function hasKey<T extends string>(
  arg: unknown,
  keys: T
): arg is Record<T, unknown>;

// eslint-disable-next-line no-redeclare
export function hasKey(arg: unknown, key: string | string[]): boolean {
  if (!isObject(arg)) {
    return false;
  }

  const keys = Array.isArray(key) ? key : [key];
  return keys.every((k) => k in arg);
}
