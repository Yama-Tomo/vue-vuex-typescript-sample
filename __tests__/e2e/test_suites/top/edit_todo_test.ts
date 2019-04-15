import last from 'lodash/last';
import Top from '../../pages/top';

describe('create, update and delete of todo', () => {
  test(
    'todoが追加されること',
    async () => {
      const topPage = new Top(page, browser);
      const inputTodoContent = 'hogehoge1';

      await topPage.open();

      const beforeTodoElements = await topPage.getTodoElements();
      await topPage.inputTodo(inputTodoContent);
      const afterTodoElements = await topPage.getTodoElements();

      expect(afterTodoElements.length).toEqual(beforeTodoElements.length + 1);

      const todoContent = await (() => {
        const lastElement = last(afterTodoElements);
        if (lastElement === undefined)
          throw new Error('not found last element');

        return topPage.getTodoContent(lastElement);
      })();

      expect(todoContent).toEqual(inputTodoContent);
    },
    timeout
  );

  test(
    'todoを編集できること',
    async () => {
      const topPage = new Top(page, browser);

      await topPage.open();
      await topPage.inputTodo('hogehoge2');
      const beforeTodoElement = last(await topPage.getTodoElements());
      if (beforeTodoElement === undefined)
        throw new Error('failed get todo element');

      const inputTodoContent = 'hogehoge2[edited]';
      await topPage.editTodo('hogehoge2[edited]', beforeTodoElement);

      const todoContent = await (async () => {
        const lastElement = last(await topPage.getTodoElements());
        if (lastElement === undefined)
          throw new Error('not found last element');

        return topPage.getTodoContent(lastElement);
      })();

      expect(todoContent).toEqual(inputTodoContent);
      // await page.screenshot({ path: 'example-2.png' });
    },
    timeout
  );

  test(
    'todoを削除できること',
    async () => {
      const topPage = new Top(page, browser);

      await topPage.open();

      const beforeTodoElements = await topPage.getTodoElements();
      await topPage.inputTodo('hogehoge3');
      const beforeLastTodoElement = last(beforeTodoElements);
      if (beforeLastTodoElement === undefined)
        throw new Error('failed get todo element');

      await topPage.removeTodo(beforeLastTodoElement);
      const afterTodoElements = await topPage.getTodoElements();

      expect(afterTodoElements.length).toEqual(beforeTodoElements.length);
    },
    timeout
  );
});
