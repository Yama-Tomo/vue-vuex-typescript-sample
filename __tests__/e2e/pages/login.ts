import { Browser, Page } from 'puppeteer';
import Top from './top';

export default class Login {
  private readonly page: Page;
  private readonly browser: Browser;

  public constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  public async open(cb?: () => void) {
    const baseUrl = url.base;
    await page.goto(`${baseUrl}/ja/login`);
    if (!cb) {
      await this.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async assertThisPageVisited() {
    await this.page.waitForSelector('#__layout > div > div:nth-child(3) > form', { visible: true });
  }

  public async doLogin(email: string, password: string, cb?: () => void) {
    await this.page.type('input[name="email"]', email);
    await this.page.type('input[name="password"]', password);
    await this.page.click('#__layout > div > div:nth-child(3) > form > button');

    if (!cb) {
      const topPage = new Top(this.page, this.browser);
      await topPage.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async doLogout(cb?: () => void) {
    await this.page.click('#__layout > div > div.signin > a');

    if (!cb) {
      const topPage = new Top(this.page, this.browser);
      await topPage.assertThisPageVisited();
    } else {
      await cb();
    }
  }
}
