import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { Todo } from '@/store/todo';
import { ActionTree, GetterTree, StateTree } from '@/store/module_mapper';
import { InputEvent } from '@/types/dom';

interface Filters {
  all: (todos: Todo[]) => Todo[];
  active: (todos: Todo[]) => Todo[];
  completed: (todos: Todo[]) => Todo[];
}

@Component
export class Logic extends Vue {
  @Prop()
  public state!: StateTree['todo'];
  @Prop()
  public actions!: ActionTree['todo'];
  @Prop()
  public getters!: GetterTree['todo'];

  public visibility: keyof Filters = 'all';

  public input = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public render() {}

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
    this.input = (e as InputEvent).target.value.trim();

    if ((e as KeyboardEvent).key !== 'Enter' || !this.input) return;

    this.actions.addTodo(this.input);
    this.input = '';
  }
}

export type Props = Pick<Logic, 'state' | 'actions' | 'getters'>;
