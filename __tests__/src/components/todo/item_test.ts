/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import Component from '@/components/todo/item.vue';
import { TodoActions } from '@/store_modules/todo/actions';
import { Todo } from '@/store_modules/todo/state/todo';

const defaultTodoState = { text: 'aaa', done: false };
const getWrapper = (arg?: {
  actions?: { [KEY in keyof TodoActions]?: any };
  state?: Todo;
  data?: () => any;
}) => {
  const options = {
    data: arg ? arg.data : () => ({}),
    propsData: {
      todo: {
        ...defaultTodoState,
        ...(arg && arg.state ? arg.state : {}),
      },
      actions: arg && arg.actions,
    },
    mocks: {
      $t: (key: string) => `[Mocked i18n] ${key}`,
    },
  };

  return mount(Component, options);
};

describe('behaviors', () => {
  test('チェックボックスのチェックを入れたらステートを完了状態に変更するvuexのactionを呼び出すこと', () => {
    const actionMock = jest.fn();
    const wrapper = getWrapper({ actions: { toggleTodo: actionMock } });

    wrapper.find('.view input.toggle').trigger('click');
    expect(actionMock.mock.calls[0]).toEqual([{ todo: defaultTodoState }]);
  });

  test('ラベルをダブルクリックしたら編集モードになること', () => {
    const wrapper = getWrapper();

    wrapper.find('.view label').trigger('dblclick');
    expect(wrapper.find('input.edit').isVisible()).toBe(true);
    expect(wrapper.find('li').classes()).toContain('editing');
  });

  test('削除ボタンを押された時にステートを削除するvuexのactionを呼び出すこと', () => {
    const actionMock = jest.fn();
    const wrapper = getWrapper({ actions: { removeTodo: actionMock } });

    wrapper.find('button.destroy').trigger('click');
    expect(actionMock.mock.calls[0]).toEqual([{ todo: defaultTodoState }]);
  });

  test('todoの入力があった時にステートを変更するvuexのactionを呼び出すこと', () => {
    const actionMock = jest.fn();
    const wrapper = getWrapper({
      actions: { editTodo: actionMock },
      data() {
        return { editing: true };
      },
    });

    const appendText = '--append';
    const changeVal = defaultTodoState.text + appendText;
    const inputEl = wrapper.find('input.edit');

    inputEl.trigger('keyup', { key: appendText });
    inputEl.setValue((inputEl.element as HTMLInputElement).value + appendText);
    inputEl.trigger('keypress', { key: 'Enter' });
    expect(actionMock.mock.calls[0]).toEqual([
      { todo: defaultTodoState, text: changeVal },
    ]);
  });

  test('todoの入力があった時にescを押されたらテキストボックスが非表示になること', () => {
    const wrapper = getWrapper({
      data() {
        return { editing: true };
      },
    });

    const inputEl = wrapper.find('input.edit');
    inputEl.trigger('keyup', { key: 'Escape' });
    expect(inputEl.isVisible()).toBe(false);
  });

  test('todoを未入力状態にしてenterが押されたらステートを削除するvuexのactionを呼び出すこと', () => {
    const actionMock = jest.fn();
    const wrapper = getWrapper({
      data() {
        return { editing: true };
      },
      actions: { removeTodo: actionMock },
    });

    const inputEl = wrapper.find('input.edit');
    inputEl.setValue('');
    inputEl.trigger('keypress', { key: 'Enter' });
    expect(actionMock.mock.calls[0]).toEqual([{ todo: defaultTodoState }]);
  });
});

describe('rendering', () => {
  test('完了しているTODOは完了を表すcssが付いていること', () => {
    const wrapper = getWrapper({
      state: { text: 'hogehoge', done: true },
    });

    expect(wrapper.find('li').classes()).toContain('completed');
  });

  test('renders correctly', () => {
    const wrapper = getWrapper({
      data() {
        return { editing: true };
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
