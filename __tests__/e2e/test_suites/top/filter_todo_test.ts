import last from 'lodash/last';
import Top from '../../pages/top';

describe('filter todo', () => {
  test(
    'todoが追加されること',
    async () => {
      const topPage = new Top(page, browser);

      await topPage.open();
      await topPage.inputTodo('hogehoge1');

      const todoElements = await topPage.getTodoElements();
      const lastTodoElement = last(todoElements);
      if (lastTodoElement === undefined)
        throw new Error('failed get todo element');

      await topPage.completeTodo(lastTodoElement);

      // --------------
      await topPage.filterActiveTodo();
      const activeTodoElements = await topPage.getActiveTodoElements();
      expect(todoElements.length).toEqual(
        todoElements.length - activeTodoElements.length
      );

      await topPage.filterCompletedTodo();
      const completedTodoElements = await topPage.getCompletedTodoElements();
      expect(todoElements.length).toEqual(
        todoElements.length - completedTodoElements.length
      );
    },
    timeout
  );
});
