import { ActionContext } from 'vuex-type-helper';

// eslint-disable-next-line arrow-parens
export default <T1>(
  state: T1
): {
  context: ActionContext<
    T1,
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >;
  commit: jest.Mock<any, any>;
} => {
  const commit = jest.fn();

  const context = ({
    commit,
    state,
  } as any) as ActionContext<
    T1,
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >;

  return { context, commit };
};
