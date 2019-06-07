import getters, { TodoGetters } from '@/store_modules/todo/getters';
import { TodoState } from '@/store_modules/todo/state';

describe('reverse', () => {
  test('reverse', () => {
    const state = {
      todos: [
        { text: 'aaaa', done: true },
        { text: 'bbbb', done: false },
        { text: 'cccc', done: false },
      ],
    };

    const gettersInstance = {} as TodoGetters;
    expect(getters.reverse(state, gettersInstance, {}, {})).toEqual([
      { text: 'cccc', done: false },
      { text: 'bbbb', done: false },
      { text: 'aaaa', done: true },
    ]);
  });

  test('latest', () => {
    const gettersInstance = {
      // NOTE: mock
      reverse: [
        { text: 'cccc', done: false },
        { text: 'bbbb', done: false },
        { text: 'aaaa', done: true },
      ],
    } as TodoGetters;

    expect(getters.latest({} as TodoState, gettersInstance, {}, {})(2)).toEqual(
      [{ text: 'cccc', done: false }, { text: 'bbbb', done: false }]
    );
  });
});
