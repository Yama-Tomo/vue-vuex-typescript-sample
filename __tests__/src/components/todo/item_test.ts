/**
 * @jest-environment jsdom
 */

import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as Component from '@/components/todo/item.vue';
import { actions, Todo } from '@/store/todo';
Vue.use(Vuetify);

const localVue = createLocalVue();

const defaultTodoState = { text: 'aaa', done: false };
const getWrapper = (arg?: {
  actions?: { [KEY in keyof typeof actions]?: any };
  state?: Todo;
  data?: () => any;
}) => {
  const options = {
    data: arg && arg.data ? arg.data : () => ({}),
    localVue,
    vuetify: new Vuetify(),
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

  return mount(Component.default, options);
};

describe('behaviors', () => {
  test('チェックボックスのチェックを入れたらステートを完了状態に変更するvuexのactionを呼び出すこと', () => {
    const actionMock = jest.fn();
    const wrapper = getWrapper({ actions: { toggleTodo: actionMock } });

    wrapper.find('input[type="checkbox"]').trigger('click');
    expect(actionMock.mock.calls[0]).toEqual([{ todo: defaultTodoState }]);
  });

  test('ラベルをクリックしたら編集モードになること', async () => {
    const wrapper = getWrapper();

    wrapper.find('.text').trigger('click');

    await Vue.nextTick();
    expect(wrapper.find('.v-text-field input').isVisible()).toBe(true);
    expect(wrapper.find('.v-list-item').classes()).toContain('editing');
  });

  test('削除ボタンを押された時にステートを削除するvuexのactionを呼び出すこと', () => {
    const actionMock = jest.fn();
    const wrapper = getWrapper({ actions: { removeTodo: actionMock } });

    wrapper.find('button').trigger('click');
    expect(actionMock.mock.calls[0]).toEqual([defaultTodoState]);
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
    const inputEl = wrapper.find('.v-text-field input');

    inputEl.trigger('keyup', { key: appendText });
    inputEl.setValue((inputEl.element as HTMLInputElement).value + appendText);
    inputEl.trigger('keypress', { key: 'Enter' });
    expect(actionMock.mock.calls[0]).toEqual([
      { todo: defaultTodoState, text: changeVal },
    ]);
  });

  test('todoの入力があった時にescを押されたらテキストボックスが非表示になること', async () => {
    const wrapper = getWrapper({
      data() {
        return { editing: true };
      },
    });

    const inputEl = wrapper.find('.v-text-field input');
    inputEl.trigger('keyup', { key: 'Escape' });
    await Vue.nextTick();

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

    const inputEl = wrapper.find('.v-text-field input');
    inputEl.setValue('');
    inputEl.trigger('keypress', { key: 'Enter' });
    expect(actionMock.mock.calls[0]).toEqual([defaultTodoState]);
  });
});

describe('unit-tests', () => {
  test('liのclass属性のテスト', () => {
    const func = (Component as any).__get__('liClass');
    expect(func({ text: 'aaa', done: true }, true)).toEqual(
      'todo completed editing'
    );
    expect(func({ text: 'aaa', done: true }, false)).toEqual('todo completed');
  });
});

describe('rendering', () => {
  test('完了しているTODOは完了を表すcssが付いていること', () => {
    const wrapper = getWrapper({
      state: { text: 'hogehoge', done: true },
    });

    expect(wrapper.find('.v-list-item').classes()).toContain('completed');
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
