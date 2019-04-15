export interface User {
  id: number;
  email: string;
}

export interface AuthState {
  busy: boolean;
  loggedIn: boolean;
  redirect: null | string;
  strategy: string;
  user: User;
}
