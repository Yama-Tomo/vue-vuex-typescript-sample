import Login from '../pages/login';
import Top from '../pages/top';

describe('login and logout', () => {
  test(
    'loginとlogoutが成功すること',
    async () => {
      const topPage = new Top(page, browser);
      const loginPage = new Login(page, browser);

      await topPage.open();
      await topPage.gotoLogin();
      await loginPage.doLogin(user.email, user.password);
      await loginPage.doLogout();
    },
    timeout
  );
});
