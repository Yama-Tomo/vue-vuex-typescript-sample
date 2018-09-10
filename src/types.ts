export interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

/* tslint:disable:no-namespace */
export namespace Nuxt {
  export interface Error {
    statusCode: number;
    path: string;
    message: string;
  }
}
