/**
 * @jest-environment jsdom
 */

import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

type ImageSnapshotArgs = Required<
  NonNullable<Parameters<typeof imageSnapshot>[0]>
>;

(() => {
  if (!process.env.IS_DOCKER) {
    // run `yarn test:use-docker yarn test __tests__/storyshots` after run yarn sb:build if you want run this test
    test.skip('not running visual testing in not Docker environment', () =>
      null);
    return;
  }

  const storybookUrl = `file://${path.resolve('./storybook-static')}`;

  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  const puppeteerConfig = require('../../jest-puppeteer.config');

  const getScreenshotOptions = () =>
    ({
      fullPage: false,
      encoding: 'base64',
    } as const);

  const beforeScreenshot = async (
    ...args: Parameters<ImageSnapshotArgs['beforeScreenshot']>
  ) => {
    const page = args[0];
    const url = args[1].url;

    if (url.includes('id=components-todo-item--')) {
      // change take screenshot size in specific story
      await page.setViewport({ width: 400, height: 100 });
    } else {
      await page.setViewport({ width: 800, height: 600 });

      if (url.includes('components-todo-list--')) {
        // NOTE: focus out
        await page.click('body');
        // wait for css transition
        await page.waitForTimeout(300);
      }
    }
  };

  jest.setTimeout(100000);

  initStoryshots({
    suite: 'Image storyshots',
    test: imageSnapshot({
      storybookUrl,
      getScreenshotOptions,
      beforeScreenshot,
      chromeExecutablePath: puppeteerConfig.launch.executablePath,
      getGotoOptions: () => ({
        waitUntil: 'networkidle2',
      }),
    }),
  });
})();
