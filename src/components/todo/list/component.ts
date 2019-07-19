import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { CreateElement } from 'vue';
import { TodoState } from '@/store_modules/todo/state';
import { Todo } from '@/store_modules/todo/state/todo';
import { TodoActions } from '@/store_modules/todo/actions';
import { Actions, Getters } from '@/mixins/store_helper';
import { TodoGetters } from '@/store_modules/todo/getters';
import { InputEvent } from '@/types/dom';

interface Filters {
  all: (todos: Todo[]) => Todo[];
  active: (todos: Todo[]) => Todo[];
  completed: (todos: Todo[]) => Todo[];
}

@Component
export class Logic extends Vue {
  @Prop()
  public state!: TodoState;
  @Prop()
  public actions!: Actions<TodoActions>;
  @Prop()
  public getters!: Getters<TodoGetters>;

  public visibility: keyof Filters = 'all';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public template(h: CreateElement, self: Logic): JSX.Element | void {}

  public render(h: CreateElement) {
    return this.template(h, this);
  }

  @Watch('$route')
  public onRouteChanged(route: Route) {
    this.filterByRouteHash(route);
  }

  public mounted() {
    this.filterByRouteHash(this.$route);
  }

  public filterByRouteHash(route: Route) {
    if (!route.hash) {
      return;
    }

    const visibility = route.hash.replace(/#\//, '');
    const includeFiltersKey = (key: string): key is keyof Filters =>
      key in this.filters;

    if (includeFiltersKey(visibility)) {
      this.visibility = visibility;
    }
  }

  public get filters(): Filters {
    return {
      all: (todos: Todo[]) => todos,
      active: (todos: Todo[]) => todos.filter(todo => !todo.done),
      completed: (todos: Todo[]) => todos.filter(todo => todo.done),
    };
  }

  public get allChecked(): boolean {
    return this.state.todos.every(todo => todo.done);
  }

  public get filteredTodos() {
    return this.filters[this.visibility](this.state.todos);
  }

  public get remaining() {
    return this.state.todos.filter(todo => !todo.done).length;
  }

  public addTodo(e: Event): void {
    if ((e as KeyboardEvent).key !== 'Enter') return;

    const text = (e as InputEvent).target.value.trim();
    if (!text) {
      return;
    }

    this.actions.addTodo({ text });
    (e as InputEvent).target.value = '';
  }
}

export type Props = Pick<Logic, 'state' | 'actions' | 'getters'>;
