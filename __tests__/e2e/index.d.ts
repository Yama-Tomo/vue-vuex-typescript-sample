declare global {
  const url: {
    base: string;
  };
  const user: {
    password: string;
    email: string;
  };
  const timeout: number;
}

export {};
