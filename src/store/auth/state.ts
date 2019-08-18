interface User {
  id: number;
  email: string;
}

export interface State {
  busy: boolean;
  loggedIn: boolean;
  redirect: null | string;
  strategy: string;
  user: User;
}
