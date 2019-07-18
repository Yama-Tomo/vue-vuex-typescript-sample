import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { CreateElement } from 'vue';
import * as vts from 'vue-tsx-support';
import Item from '../item.vue';
import { TodoState } from '@/store_modules/todo/state';
import { Todo } from '@/store_modules/todo/state/todo';
import { TodoActions } from '@/store_modules/todo/actions';
import { Actions, Getters } from '@/mixins/store_helper';
import { TodoGetters } from '@/store_modules/todo/getters';
import { InputEvent } from '@/types/dom';
import { objectToArray, pluralize } from '@/components/todo/list/functions';

const template = (h: CreateElement, self: List) => (
  <section class="todoapp">
    <header class="header">
      <h1>{self.$t('todo.title')}</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder={self.$t('todo.input_placeholder').toString()}
        onKeypress={e => self.addTodo(e)}
      />
    </header>
    <section v-show={self.state.todos.length} class="main">
      <label>
        <input
          class="toggle-all"
          type="checkbox"
          checked={self.allChecked}
          onChange={() => self.actions.toggleAll({ done: !self.allChecked })}
        />
        select all
      </label>
      <ul class="todo-list">
        {self.filteredTodos.map(todo => (
          <Item todo={todo} actions={self.actions} />
        ))}
      </ul>
    </section>
    <footer v-show={self.state.todos.length} class="footer">
      <span class="todo-count">
        <strong>{self.remaining}</strong>
        {self.$t('todo.item_unit', {
          unit: pluralize(self.remaining, ''),
        })}
      </span>
      <ul class="filters">
        {objectToArray(self.filters).map(filter => (
          <li>
            {self.visibility === filter.key ? (
              self.$t(`todo.filter.${filter.key}`)
            ) : (
              <a
                href={`#/${filter.key}`}
                class={self.visibility === filter.key ? 'selected' : ''}
                onClick={() => {
                  self.visibility = filter.key;
                }}
              >
                {self.$t(`todo.filter.${filter.key}`)}
              </a>
            )}
          </li>
        ))}
      </ul>
      <button
        v-show={self.state.todos.length > self.remaining}
        class="clear-completed"
        onClick={() => self.actions.clearCompleted({})}
      >
        {self.$t('todo.clear')}
      </button>
    </footer>
  </section>
);

interface Filters {
  all: (todos: Todo[]) => Todo[];
  active: (todos: Todo[]) => Todo[];
  completed: (todos: Todo[]) => Todo[];
}

@Component({
  components: {
    Item,
  },
})
class List extends Vue {
  @Prop()
  public state!: TodoState;
  @Prop()
  public actions!: Actions<TodoActions>;
  @Prop()
  public getters!: Getters<TodoGetters>;

  public visibility: keyof Filters = 'all';

  public render(h: CreateElement) {
    return template(h, this);
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

type Props = Pick<List, 'state' | 'actions' | 'getters'>;
export default vts.ofType<Props>().convert(List);
