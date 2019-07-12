import Top from '../../pages/top';
import Login from '../../pages/login';

describe('i18n feature', () => {
  test(
    '他言語へ切り替えた後リロードしてもその言語が維持されること',
    async () => {
      const topPage = new Top(page, browser);
      const loginPage = new Login(page, browser);

      await topPage.open();
      await topPage.gotoOtherLangThisPage();

      const currentUrl = await page.url();
      await page.reload({ waitUntil: 'networkidle2' });

      expect(await page.url()).toEqual(currentUrl);

      await topPage.gotoLogin();
      await loginPage.doLogin(user.email, user.password);
      expect(currentUrl.includes(await page.url())).toBeTruthy();
    },
    timeout
  );
});
