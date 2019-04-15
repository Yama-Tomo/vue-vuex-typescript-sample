import { Browser, ElementHandle, Page } from 'puppeteer';
import { deleteAll } from '../utils/keyboard';
import { getElement } from '../utils/element';
import Login from './login';

export default class Top {
  private readonly page: Page;
  private readonly browser: Browser;

  public constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  public async open(cb?: () => void) {
    const baseUrl = url.base;
    await page.goto(`${baseUrl}/ja`, { waitUntil: 'networkidle2' });
    if (!cb) {
      await this.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async assertThisPageVisited() {
    await this.page.waitForSelector(
      '#__layout > div > div:nth-child(3) > section > header > h1',
      { visible: true }
    );
  }

  public async gotoLogin(cb?: () => void) {
    await this.page.click('#__layout > div > div.signin > a');
    if (!cb) {
      const loginPage = new Login(page, browser);
      await loginPage.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async inputTodo(todoContent: string) {
    // eslint-disable-next-line quotes
    await this.page.type(
      '#__layout > div > div:nth-child(3) > section > header > input',
      todoContent + '\n'
    );
  }

  public async editTodo(
    todoContent: string,
    liElement: ElementHandle<Element>
  ) {
    await getElement(liElement, 'label').then(e => e.click({ clickCount: 2 }));
    await page.waitFor(100);

    const inputEle = await (() => {
      return liElement.$('input.edit').then(e => {
        if (e === null) throw new Error('not found input element');

        return e;
      });
    })();

    await deleteAll(inputEle);
    // eslint-disable-next-line quotes
    await inputEle.type(todoContent + '\n');
    await page.waitFor(100);
  }

  public getTodoElements() {
    return this.page.$$(
      '#__layout > div > div:nth-child(3) > section > section > ul > li'
    );
  }

  public getTodoContent(liElement: ElementHandle<Element>) {
    return getElement(liElement, 'label').then(e =>
      page.evaluate(_e => (_e as Element).textContent, e)
    );
  }

  public removeTodo(liElement: ElementHandle<Element>) {
    return getElement(liElement, 'button').then(e => e.click());
  }

  public completeTodo(liElement: ElementHandle<Element>) {
    return getElement(liElement, "input[type='checkbox']").then(e => e.click());
  }

  public getActiveTodoElements() {
    return this.page.$$(
      "#__layout > div > div:nth-child(3) > section > section > ul > li input[type='checkbox']:checked"
    );
  }

  public getCompletedTodoElements() {
    return this.page.$$(
      "#__layout > div > div:nth-child(3) > section > section > ul > li input[type='checkbox']:not(:checked)"
    );
  }

  public filterActiveTodo() {
    return this.page.click(
      '#__layout > div > div:nth-child(3) > section > footer > ul > li:nth-child(2) > a'
    );
  }

  public filterCompletedTodo() {
    return this.page.click(
      '#__layout > div > div:nth-child(3) > section > footer > ul > li:nth-child(3) > a'
    );
  }

  public async gotoOtherLangThisPage(cb?: () => void) {
    const currentUrl = await this.page.url();

    await this.page.click(
      '#__layout > div > div:nth-child(5) > a:nth-child(4)'
    );
    await this.page.waitForFunction(
      c => window.location.href !== c,
      { polling: 'raf' },
      currentUrl
    );

    if (!cb) {
      await this.assertThisPageVisited();
    } else {
      await cb();
    }
  }
}
