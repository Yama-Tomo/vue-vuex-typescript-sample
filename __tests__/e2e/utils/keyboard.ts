import { ElementHandle } from 'puppeteer';

export async function deleteAll(element: ElementHandle<Element>) {
  const inputVal = await page.evaluate((e) => e.value, element);
  if (inputVal === null) return;

  await element.focus();
  await page.keyboard.down('End');

  await page.keyboard.down('Shift');
  for (let i = 0; i < inputVal.toString().length; i++) {
    await page.keyboard.press('ArrowLeft');
  }
  await page.keyboard.up('Shift');

  await page.keyboard.press('Backspace');
}
