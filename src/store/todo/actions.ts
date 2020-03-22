import { ActionTree } from 'vuex';
import { initialStateResolver, State, Todo } from './state';
import mutations from './mutations';
import { ActionContext } from '@/types/store';
import { RootState } from '@/store/module_mapper';

type Context = ActionContext<State, typeof mutations, RootState>;

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
    return new Promise((resolve: () => void) => {
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

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _checkTypes: ActionTree<State, RootState> = actions; // don't remove this line;

export default actions;
