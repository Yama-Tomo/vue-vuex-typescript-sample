import { ElementHandle } from 'puppeteer';

export function getElement(element: ElementHandle<Element>, selector: string) {
  return element.$(selector).then((e) => {
    if (e === null) throw new Error(`not found [${selector}] element`);

    return e;
  });
}
