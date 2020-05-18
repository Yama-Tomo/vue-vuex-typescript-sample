type User = {
  id: number;
  email: string;
};

export type State = {
  busy: boolean;
  loggedIn: boolean;
  redirect: null | string;
  strategy: string;
  user: User;
};
