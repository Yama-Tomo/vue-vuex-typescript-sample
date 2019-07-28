/**
 * @jest-environment jsdom
 */

import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { Page } from 'puppeteer';
// TODO create types file
const imageSnapshot = require('@storybook/addon-storyshots-puppeteer')
  .imageSnapshot;

(() => {
  if (!process.env.IS_DOCKER) {
    // run `yarn test:use-docker yarn test __tests__/storyshots` after run yarn sb:build if you want run this test
    test.skip('not running visual testing in not Docker environment', () => {});
    return;
  }

  const storybookUrl = `file://${path.resolve('./storybook-static')}`;

  const puppeteerConfig = require('../../jest-puppeteer.config');

  const getScreenshotOptions = () => ({
    fullPage: false,
  });

  const beforeScreenshot = (page: Page, { url }: { url: string }) => {
    if (url.includes('id=components-todo-item--')) {
      // change take screenshot size in specific story
      page.setViewport({ width: 300, height: 100 });
    } else {
      page.setViewport({ width: 800, height: 600 });
    }
  };

  initStoryshots({
    suite: 'Image storyshots',
    test: imageSnapshot({
      storybookUrl,
      getScreenshotOptions,
      beforeScreenshot,
      chromeExecutablePath: puppeteerConfig.launch.executablePath,
    }),
  });
})();
