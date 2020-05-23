<script lang="tsx">
import Vue, { PropType, VNode } from 'vue';
import { Route } from 'vue-router';
import * as vts from 'vue-tsx-support';
import PresentationalComponent from '@/components/todo/list/ui.vue';
import { ActionTree, GetterTree, StateTree } from '@/store';
import { InputEvent, ComponentProps } from '@/types';

type UiProps = ComponentProps<typeof PresentationalComponent>;

type LocalState = {
  visibility: keyof UiProps['filters'];
  input: string;
};

const Component = Vue.extend({
  props: {
    state: { type: Object as PropType<StateTree['todo']>, default: undefined },
    actions: {
      type: Object as PropType<ActionTree['todo']>,
      default: undefined,
    },
    getters: {
      type: Object as PropType<GetterTree['todo']>,
      default: undefined,
    },
  },
  data(): LocalState {
    return {
      visibility: 'all',
      input: '',
    };
  },
  computed: {
    filters(): UiProps['filters'] {
      return {
        all: () => this.$router.push(`#/all`),
        active: () => this.$router.push(`#/active`),
        completed: () => this.$router.push(`#/completed`),
      };
    },
    allChecked(): UiProps['allChecked'] {
      return this.state.todos.every((todo) => todo.done);
    },
    filteredTodos(): UiProps['filteredTodos'] {
      if (this.visibility === 'active') {
        return this.state.todos.filter((todo) => !todo.done);
      }

      if (this.visibility === 'completed') {
        return this.state.todos.filter((todo) => todo.done);
      }

      return this.state.todos;
    },
    remaining(): UiProps['remaining'] {
      return this.state.todos.filter((todo) => !todo.done).length;
    },
  },
  watch: {
    $route(route: Route) {
      this.filterByRouteHash(route);
    },
  },
  mounted(): void {
    this.filterByRouteHash(this.$route);
  },
  methods: {
    filterByRouteHash(route: Route) {
      if (!route.hash) {
        return;
      }

      const visibility = route.hash.replace(/#\//, '');
      const includeFiltersKey = (
        key: string
      ): key is keyof UiProps['filters'] => key in this.filters;

      if (includeFiltersKey(visibility)) {
        this.visibility = visibility;
      }
    },
    addTodo(e: Event): void {
      this.input = (e as InputEvent).target.value.trim();

      if ((e as KeyboardEvent).key !== 'Enter' || !this.input) return;

      this.actions.addTodo(this.input);
      this.input = '';
    },
  },
  render(): VNode {
    return (
      <PresentationalComponent
        state={this.state}
        actions={this.actions}
        filters={this.filters}
        filteredTodos={this.filteredTodos}
        addTodo={this.addTodo}
        allChecked={this.allChecked}
        input={this.input}
        remaining={this.remaining}
      />
    );
  },
});

type Props = ComponentProps<typeof Component>;
export default vts.ofType<Props>().convert(Component);
</script>
