import Login from '../pages/login';
import Secret from '../pages/secret';

describe('my page', () => {
  describe('if unauthorized', () => {
    test(
      'topページへリダイレクトされること',
      async () => {
        const myPage = new Secret(page, browser);
        const loginPage = new Login(page, browser);

        await myPage.open(async () => {
          await loginPage.assertThisPageVisited;
        });
      },
      timeout
    );
  });

  describe('if authorized', () => {
    test(
      'my pageに遷移できること',
      async () => {
        const myPage = new Secret(page, browser);
        const loginPage = new Login(page, browser);

        await loginPage.open();
        await loginPage.doLogin(user.email, user.password);
        await myPage.open();
      },
      timeout
    );
  });
});
