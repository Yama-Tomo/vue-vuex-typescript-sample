import { Browser, ElementHandle, Page } from 'puppeteer';
import { deleteAll } from '../utils/keyboard';
import { getElement } from '../utils/element';
import Login from './login';
import Layout from './layout';

export default class Top {
  private readonly page: Page;
  private readonly browser: Browser;
  private readonly layout: Layout;

  public constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
    this.layout = new Layout(page, browser);
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
    await this.page.waitForSelector('main header > h1', { visible: true });
  }

  public async gotoLogin() {
    const loginPage = new Login(page, browser);
    await this.layout.gotoLogin(() => loginPage.assertThisPageVisited());
  }

  public async inputTodo(todoContent: string) {
    await this.page.type('main header input', todoContent + '\n');
  }

  public async editTodo(
    todoContent: string,
    liElement: ElementHandle<Element>
  ) {
    await getElement(liElement, '.text').then((e) => e.click());
    await page.waitForTimeout(100);

    const inputEle = await (() => {
      return liElement.$('.v-text-field input').then((e) => {
        if (e === null) throw new Error('not found input element');

        return e;
      });
    })();

    await deleteAll(inputEle);
    await inputEle.type(todoContent + '\n');
    await page.waitForTimeout(100);
  }

  public getTodoElements() {
    return this.page.$$('main .v-list > div');
  }

  public getTodoContent(liElement: ElementHandle<Element>) {
    return getElement(liElement, '.text').then((e) =>
      page.evaluate((_e) => (_e as Element).textContent, e)
    );
  }

  public removeTodo(liElement: ElementHandle<Element>) {
    return getElement(liElement, 'button').then((e) => e.click());
  }

  public completeTodo(liElement: ElementHandle<Element>) {
    return getElement(liElement, "input[type='checkbox']").then((e) =>
      e.click()
    );
  }

  public getActiveTodoElements() {
    return this.page.$$("main .v-list > div input[type='checkbox']:checked");
  }

  public getCompletedTodoElements() {
    return this.page.$$(
      "main .v-list > div input[type='checkbox']:not(:checked)"
    );
  }

  public filterActiveTodo() {
    return this.page.click('main .v-tab:nth-of-type(3)');
  }

  public filterCompletedTodo() {
    return this.page.click('main .v-tab:nth-of-type(4)');
  }

  public async gotoOtherLangThisPage() {
    await this.layout.gotoOtherLangThisPage(() => this.assertThisPageVisited());
  }
}
