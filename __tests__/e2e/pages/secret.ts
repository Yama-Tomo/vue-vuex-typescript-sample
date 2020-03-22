import { Browser, Page } from 'puppeteer';

export default class Secret {
  private readonly page: Page;
  private readonly browser: Browser;

  public constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  public async open(cb?: () => void) {
    const baseUrl = url.base;
    await page.goto(`${baseUrl}/ja/secret`, { waitUntil: 'networkidle2' });
    if (!cb) {
      await this.assertThisPageVisited();
    } else {
      await cb();
    }
  }

  public async assertThisPageVisited() {
    const text = await this.page.$eval('main h1', (el) => el.textContent);
    expect(text).toEqual('Secret');
  }
}
