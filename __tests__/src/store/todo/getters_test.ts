import { getters, State } from '@/store/todo';

describe('reverse', () => {
  test('reverse', () => {
    const state = {
      todos: [
        { text: 'aaaa', done: true },
        { text: 'bbbb', done: false },
        { text: 'cccc', done: false },
      ],
    };

    expect(getters.reverse(state)).toEqual([
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
    };

    expect(getters.latest({} as State, gettersInstance)(2)).toEqual([
      { text: 'cccc', done: false },
      { text: 'bbbb', done: false },
    ]);
  });
});
