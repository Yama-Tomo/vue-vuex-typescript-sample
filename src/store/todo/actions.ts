import { ActionContext, Dispatchers } from '@/types/store';
import { RootState } from '@/store/module_mapper';
import { initialStateResolver, State, Todo } from './state';
import { MutationTree } from './mutations';

type Context = ActionContext<State, MutationTree, RootState>;

const actions = {
  addTodo(ctx: Context, text: string) {
    ctx.commit('addTodo', { text, done: false });
  },
  removeTodo(ctx: Context, todo: Todo) {
    ctx.commit('removeTodo', todo);
  },
  editTodo(ctx: Context, { todo, text }: { todo: Todo; text: string }) {
    ctx.commit('updateTodo', { todo, text });
  },
  toggleTodo(ctx: Context, { todo }: { todo: Todo }) {
    ctx.commit('updateTodo', { todo, done: !todo.done });
  },
  toggleAll(ctx: Context, done: boolean) {
    ctx.state.todos.forEach((todo) => {
      ctx.commit('updateTodo', { todo, done });
    });
  },
  clearCompleted(ctx: Context) {
    ctx.state.todos
      .filter((todo) => todo.done)
      .forEach((todo) => {
        ctx.commit('removeTodo', todo);
      });
  },
  fetchInitialState(ctx: Context) {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1500);
    }).then(() => {
      ctx.commit('resetState', undefined);

      const initialState = initialStateResolver({
        todos: [
          { text: 'aaaa', done: false },
          { text: 'bbbb', done: true },
        ],
      });
      ctx.commit('setInitialState', initialState);
    });
  },
};

export default actions;
export type ActionTree = Dispatchers<State, typeof actions>;
