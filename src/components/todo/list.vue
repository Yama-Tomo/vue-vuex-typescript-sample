<template>
  <section class="todoapp">
    <header class="header">
      <h1>{{ $t('todo.title') }}</h1>
      <input class="new-todo"
        autofocus
        autocomplete="off"
        :placeholder="$t('todo.input_placeholder')"
        @keyup.enter="addTodo($event)">
    </header>
    <section class="main" v-show="todos.length">
      <input class="toggle-all" id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <Item
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          :actions="actions"
        />
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ $t('todo.item_unit', {unit: pluralize(remaining, '')}) }}
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters">
          <a :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ $t(`todo.filter.${key}`) }}</a>
        </li>
      </ul>
      <button class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        {{ $t('todo.clear') }}
      </button>
    </footer>
  </section>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { TodoState } from '../../store_modules/todo/state';
import Todo from '../../store_modules/todo/state/todo';
import { TodoActions } from '../../store_modules/todo/actions';
import { HTMLElementEvent } from '@/index';
import { Actions, Getters } from '../../mixins/store_helper';
import { TodoGetters } from '../../store_modules/todo/getters';
import Item from './item.vue';
import { Route } from 'vue-router';

@Component({
  components: {
    Item,
  },
})
export default class List extends Vue {
  @Prop()
  public state!: TodoState;
  @Prop()
  public actions!: Actions<TodoActions>;
  @Prop()
  public getters!: Getters<TodoGetters>;

  public visibility: string = 'all';

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
      active: (todos: Todo[]) => todos.filter((todo) => !todo.done),
      completed: (todos: Todo[]) => todos.filter((todo) => todo.done),
    };
  }

  get todos() {
    return this.state.todos;
  }

  get allChecked(): boolean {
    return this.todos.every((todo) => todo.done);
  }

  get filteredTodos() {
    if (this.visibility === 'all' || this.visibility === 'active' || this.visibility === 'completed') {
      return this.filters[this.visibility](this.todos);
    }

    return [];
  }

  get remaining() {
    return this.todos.filter((todo) => !todo.done).length;
  }

  public addTodo(e: HTMLElementEvent<HTMLInputElement>): void {
    const text = e.target.value.trim();
    if (!text) {
      return;
    }

    this.actions.addTodo({text});
    e.target.value = '';
  }

  public toggleAll(done: boolean): void {
    this.actions.toggleAll({done});
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
}
</script>
