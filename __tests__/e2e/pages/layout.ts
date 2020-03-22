import { Browser, Page } from 'puppeteer';

export default class Layout {
  private readonly page: Page;
  private readonly browser: Browser;

  public constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
  }

  public async gotoLogin(cb?: () => void) {
    await this.page.click(
      '#app > div.v-application--wrap > header > div > div.v-toolbar__items > button'
    );
    await this.page.waitForSelector(
      '.v-menu__content--fixed.menuable__content__active',
      { visible: true }
    );
    await this.page.click(
      '.v-menu__content--fixed.menuable__content__active > div > a:last-child'
    );

    if (cb) {
      await cb();
    }
  }

  public async doLogout(cb?: () => void) {
    await this.page.click(
      '#app > div.v-application--wrap > header > div > div.v-toolbar__items > button'
    );
    await this.page.waitForSelector(
      '.v-menu__content--fixed.menuable__content__active',
      { visible: true }
    );
    await this.page.click(
      '.v-menu__content--fixed.menuable__content__active > div > a:last-child'
    );

    if (cb) {
      await cb();
    }
  }

  public async gotoOtherLangThisPage(cb?: () => void) {
    const currentUrl = await this.page.url();

    await this.page.click(
      '#app > div.v-application--wrap > header > div > button'
    );
    await this.page.waitForSelector(
      '.v-menu__content--fixed.menuable__content__active',
      { visible: true }
    );

    await this.page.click(
      '.v-menu__content--fixed.menuable__content__active > div > a:not(.v-list-item--active)'
    );

    await this.page.waitForFunction(
      (c) => window.location.href !== c,
      { polling: 'raf' },
      currentUrl
    );

    if (cb) {
      await cb();
    }
  }
}
