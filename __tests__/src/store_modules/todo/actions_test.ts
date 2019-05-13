/* eslint-disable import/first */
jest.mock('@/store_modules/todo/state', () => ({
  __esModule: true,
  ...jest.requireActual('@/store_modules/todo/state'),
  initialStateResolver: jest.fn(),
}));

import actions, { TodoActions } from '@/store_modules/todo/actions';
import { TodoMutations } from '@/store_modules/todo/mutations';
import { TodoState, initialStateResolver } from '@/store_modules/todo/state';
import actionContextHelper from '../../../utils/action_context_helper';
import { Store } from 'vuex';

const store = {} as Store<TodoState>;
const { context, commit } = actionContextHelper<
  TodoState,
  {},
  TodoActions,
  TodoMutations
>();

afterEach(() => jest.resetAllMocks());

describe('fetchInitialState', () => {
  test('called commit methods correctly', async () => {
    const mockData = { dummy: 'test' };
    ((initialStateResolver as any) as jest.Mock).mockReturnValue(mockData);

    await actions.fetchInitialState.bind(store)(context, undefined);

    expect(commit.mock.calls[0]).toEqual(['resetState', undefined]);
    expect(commit.mock.calls[1]).toEqual(['setInitialState', mockData]);
  });
});

describe('addTodo', () => {
  test('called commit methods correctly', () => {
    actions.addTodo.bind(store)(context, { text: 'aaa' });
    expect(commit.mock.calls[0]).toEqual([
      'addTodo',
      { text: 'aaa', done: false },
    ]);
  });
});
