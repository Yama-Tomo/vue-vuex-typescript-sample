<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        @keyup.enter="addTodo($event)"
      />
    </header>
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll(!allChecked)"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <Item
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          :actions="actions"
        />
      </ul>
    </section>
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ pluralize(remaining, 'item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key"
            >{{ capitalize(key) }}</a
          >
        </li>
      </ul>
      <button
        v-show="todos.length > remaining"
        class="clear-completed"
        @click="clearCompleted"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import type { PropType } from 'vue';
import * as vts from 'vue-tsx-support';
import Item from './item.vue';
import { HTMLElementEvent, ComponentProps } from '@/types';
import { Todo } from '@/modules/todo/store';
import { ActionTree, GetterTree, RootState } from '@/modules/store';

type LocalState = {
  visibility: 'all' | 'active' | 'completed';
};

const Component = Vue.extend({
  components: { Item },
  props: {
    state: {
      type: Object as PropType<RootState['todoModule']>,
      default: undefined,
    },
    actions: {
      type: Object as PropType<ActionTree['todoModule']>,
      default: undefined,
    },
    getters: {
      type: Object as PropType<GetterTree['todoModule']>,
      default: undefined,
    },
  },
  data(): LocalState {
    return {
      visibility: 'all',
    };
  },
  computed: {
    filters(): { [K in LocalState['visibility']]: (todos: Todo[]) => Todo[] } {
      return {
        all: (todos: Todo[]) => todos,
        active: (todos: Todo[]) => todos.filter((todo) => !todo.done),
        completed: (todos: Todo[]) => todos.filter((todo) => todo.done),
      };
    },
    todos(): RootState['todoModule']['todos'] {
      return this.state.todos;
    },
    allChecked(): boolean {
      return this.todos.every((todo) => todo.done);
    },
    filteredTodos(): RootState['todoModule']['todos'] {
      return this.filters[this.visibility](this.todos);
    },
    remaining(): number {
      return this.todos.filter((todo) => !todo.done).length;
    },
  },
  methods: {
    addTodo(e: HTMLElementEvent<HTMLInputElement>): void {
      const text = e.target.value.trim();
      if (!text) {
        return;
      }

      this.actions.addTodo(text);
      e.target.value = '';
    },
    toggleAll(done: boolean): void {
      this.actions.toggleAll(done);
    },
    clearCompleted(): void {
      this.actions.clearCompleted();
    },
    pluralize(wordLength: number, word: string): string {
      return wordLength === 1 ? word : word + 's';
    },
    capitalize(word: string): string {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
  },
});

type Props = ComponentProps<typeof Component>;
export default vts.ofType<Props>().convert(Component);
</script>

<style lang="scss" scoped>
h1 {
  color: #333;
}
</style>
