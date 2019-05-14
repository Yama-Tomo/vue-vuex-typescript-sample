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
>({ todos: [] });

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

describe('removeTodo', () => {
  test('called commit methods correctly', () => {
    const todo = { text: 'test', done: true };
    actions.removeTodo.bind(store)(context, { todo });

    expect(commit.mock.calls[0]).toEqual(['removeTodo', todo]);
  });
});

describe('editTodo', () => {
  test('called commit methods correctly', () => {
    const todo = { text: 'test', done: true };
    const text = 'change text';
    actions.editTodo.bind(store)(context, { todo, text });

    expect(commit.mock.calls[0]).toEqual(['updateTodo', { todo, text }]);
  });
});

describe('toggleTodo', () => {
  test('called commit methods correctly', () => {
    const todo = { text: 'test', done: true };
    actions.toggleTodo.bind(store)(context, { todo });

    expect(commit.mock.calls[0]).toEqual(['updateTodo', { todo, done: false }]);
  });
});

describe('toggleAll', () => {
  test('called commit methods correctly', () => {
    const todo1 = { text: 'test', done: true };
    const todo2 = { text: 'test2', done: false };
    const state: TodoState = { todos: [todo1, todo2] };

    actions.toggleAll.bind(store)(
      { ...context, ...{ state } },
      { done: false }
    );

    expect(commit.mock.calls[0]).toEqual([
      'updateTodo',
      { todo: todo1, done: false },
    ]);

    expect(commit.mock.calls[1]).toEqual([
      'updateTodo',
      { todo: todo2, done: false },
    ]);
  });
});

describe('clearCompleted', () => {
  test('called commit methods correctly', () => {
    const todo1 = { text: 'test', done: true };
    const todo2 = { text: 'test2', done: false };
    const todo3 = { text: 'test3', done: true };
    const state: TodoState = { todos: [todo1, todo2, todo3] };

    actions.clearCompleted.bind(store)({ ...context, ...{ state } }, {});

    expect(commit.mock.calls[0]).toEqual(['removeTodo', todo1]);
    expect(commit.mock.calls[1]).toEqual(['removeTodo', todo3]);
  });
});
