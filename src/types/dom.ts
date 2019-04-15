export interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

export type InputEvent = HTMLElementEvent<HTMLInputElement>;
