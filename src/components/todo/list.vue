<script lang='tsx'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { Route } from 'vue-router';
import { CreateElement } from 'vue';
import * as vts from 'vue-tsx-support';
import { TodoState } from '../../store_modules/todo/state';
import { Todo } from '../../store_modules/todo/state/todo';
import { TodoActions } from '../../store_modules/todo/actions';
import { InputEvent } from '@/types/dom';
import { Actions, Getters } from '../../mixins/store_helper';
import { TodoGetters } from '../../store_modules/todo/getters';
import Item from './item.vue';

const template = (h: CreateElement, self: List) => {
  return (
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
      <section v-show={self.todos.length} class="main">
        <label>
          <input
            class="toggle-all"
            type="checkbox"
            checked={self.allChecked}
            onChange={() => self.toggleAll(!self.allChecked)}
          />
          select all
        </label>
        <ul class="todo-list">
          {self.filteredTodos.map(todo => <Item todo={todo} actions={self.actions} />)}
        </ul>
      </section>
      <footer v-show={self.todos.length} class="footer">
        <span class="todo-count">
          <strong>{self.remaining}</strong>
          {self.$t('todo.item_unit', { unit: self.pluralize(self.remaining, '') })}
        </span>
        <ul class="filters">
          {self.objectToArray(self.filters).map(filter => (
            <li>
              {self.visibility === filter.key
                ? self.$t(`todo.filter.${filter.key}`)
                : <a
                  href={`#/${filter.key}`}
                  class={self.visibility === filter.key ? 'selected' : ''}
                  onClick={() => {
                    self.visibility = filter.key;
                  }}
                >
                  {self.$t(`todo.filter.${filter.key}`)}
                </a>
              }
            </li>
          ))}
        </ul>
        <button
          v-show={ self.todos.length > self.remaining }
          class="clear-completed"
          onClick={self.clearCompleted}
        >
          {self.$t('todo.clear')}
        </button>
      </footer>
    </section>
  );
};

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

  public visibility: string = 'all';

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
    if (route.hash) {
      this.visibility = route.hash.replace(/#\//, '');
    }
  }

  get filters() {
    return {
      all: (todos: Todo[]) => todos,
      active: (todos: Todo[]) => todos.filter(todo => !todo.done),
      completed: (todos: Todo[]) => todos.filter(todo => todo.done),
    };
  }

  get todos() {
    return this.state.todos;
  }

  get allChecked(): boolean {
    return this.todos.every(todo => todo.done);
  }

  get filteredTodos() {
    if (this.visibility === 'all' || this.visibility === 'active' || this.visibility === 'completed') {
      return this.filters[this.visibility](this.todos);
    }

    return [];
  }

  get remaining() {
    return this.todos.filter(todo => !todo.done).length;
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

  public toggleAll(done: boolean): void {
    this.actions.toggleAll({ done });
  }

  public clearCompleted(): void {
    this.actions.clearCompleted({});
  }

  public pluralize(wordLength: number, word: string): string {
    return wordLength === 1 ? word : (word + 's');
  }

  public capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  public objectToArray<T extends Object>(obj: T) {
    const array: Array<{ key: keyof T; value: T[keyof T] }> = [];

    for (const key of Object.keys(obj) as Array<keyof T>) {
      array.push({ key: key, value: obj[key] });
    }

    return array;
  }
}

export default vts.ofType<Partial<List>>().convert(List);
</script>

<style lang="scss" scoped>
ul.filters {
  padding: 0px;

  li {
    &:not(:last-child) {
      margin-right: 10px;
    }
    display: inline-block;
  }
}
</style>
