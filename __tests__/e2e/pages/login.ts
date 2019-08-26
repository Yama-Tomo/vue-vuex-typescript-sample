import { Browser, Page } from 'puppeteer';
import Top from './top';
import Layout from './layout';

export default class Login {
  private readonly page: Page;
  private readonly browser: Browser;
  private readonly layout: Layout;
  private formEl = 'main .row form';

  public constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
    this.layout = new Layout(page, browser);
  }

  public async open(cb?: () => void) {
    const baseUrl = url.base;
    await page.goto(`${baseUrl}/ja/login`, { waitUntil: 'networkidle2' });
    if (!cb) {
      await this.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async assertThisPageVisited() {
    await this.page.waitForSelector(this.formEl, { visible: true });
  }

  public async doLogin(email: string, password: string, cb?: () => void) {
    await this.page.type('input[name="email"]', email);
    await this.page.type('input[name="password"]', password);
    await this.page.click(`${this.formEl} button`);

    if (!cb) {
      const topPage = new Top(this.page, this.browser);
      await topPage.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async doLogout() {
    const topPage = new Top(this.page, this.browser);
    await topPage.assertThisPageVisited();
    await this.layout.doLogout(() => topPage.assertThisPageVisited());
  }
}
