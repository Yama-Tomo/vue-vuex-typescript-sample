export default class Todo {
  public text: string;
  public done: boolean;

  constructor(text: string, done: boolean) {
    this.text = text;
    this.done = done;
  }
}
