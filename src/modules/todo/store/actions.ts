import { State, Todo } from './state';
import { MutationTree } from './mutations';
import { ActionContext, Dispatchers } from '@/types';
import { RootState } from '@/modules/store';

type Context = ActionContext<State, MutationTree, RootState>;

const actions = {
  addTodo(ctx: Context, text: string): void {
    ctx.commit('addTodo', { text, done: false });
  },
  removeTodo(ctx: Context, todo: Todo): void {
    ctx.commit('removeTodo', todo);
  },
  editTodo(ctx: Context, { todo, text }: { todo: Todo; text: string }): void {
    ctx.commit('updateTodo', { todo, text });
  },
  toggleTodo(ctx: Context, todo: Todo): void {
    ctx.commit('updateTodo', { todo, done: !todo.done });
  },
  toggleAll(ctx: Context, done: boolean): void {
    ctx.state.todos.forEach(todo => {
      ctx.commit('updateTodo', { todo, done });
    });
  },
  clearCompleted(ctx: Context): void {
    ctx.state.todos
      .filter(todo => todo.done)
      .forEach(todo => {
        ctx.commit('removeTodo', todo);
      });
  },
};

export default actions;
export type ActionTree = Dispatchers<State, typeof actions>;
