import { ActionContext } from 'vuex-type-helper';

// eslint-disable-next-line arrow-parens
export default <T1, T2, T3, T4>(): {
  context: ActionContext<T1, T2, T3, T4>;
  commit: jest.Mock<any, any>;
} => {
  const commit = jest.fn();

  const context = ({
    commit: commit,
  } as any) as ActionContext<T1, T2, T3, T4>;

  return { context, commit };
};
