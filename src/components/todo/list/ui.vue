<script lang="tsx">
import Vue, { PropType, VNode } from 'vue';
import * as vts from 'vue-tsx-support';
import { Fragment } from 'vue-fragment';
import { objectToArray, pluralize } from '@/components/todo/list/functions';
import { ActionTree, StateTree } from '@/store';
import { ComponentProps } from '@/types';
import Item from '../item.vue';

type Filters = {
  all: () => void;
  active: () => void;
  completed: () => void;
};

const Component = Vue.extend({
  props: {
    state: { type: Object as PropType<StateTree['todo']>, default: undefined },
    actions: {
      type: Object as PropType<ActionTree['todo']>,
      default: undefined,
    },
    filters: { type: Object as PropType<Filters>, default: undefined },
    filteredTodos: {
      type: Array as PropType<StateTree['todo']['todos']>,
      default: undefined,
    },
    addTodo: {
      type: Function as PropType<(e: Event) => void>,
      default: undefined,
    },
    allChecked: { type: Boolean as PropType<boolean>, default: undefined },
    input: { type: String as PropType<string>, default: undefined },
    remaining: { type: Number as PropType<number>, default: undefined },
  },
  render(): VNode {
    return (
      <Fragment>
        <header class="header">
          <h1>{this.$t('todo.title')}</h1>
          <v-text-field
            label={String(this.$t('todo.input_placeholder'))}
            autofocus
            onKeypress={(e: Event) => this.addTodo(e)}
            value={this.input}
          />
        </header>
        <section v-show={this.state.todos.length} class="main">
          <v-row justify="center" class="filter">
            <v-col cols="6" sm="6">
              <v-tabs grow>
                {objectToArray(this.filters).map((filter) => (
                  <v-tab onClick={filter.value}>
                    {this.$t(`todo.filter.${filter.key}`)}
                  </v-tab>
                ))}
              </v-tabs>
            </v-col>
          </v-row>
          <v-checkbox
            class="toggle-all"
            onChange={() => this.actions.toggleAll(!this.allChecked)}
            input-value={this.allChecked}
            label="select All"
            hide-details
          />
          <v-divider />
          {this.filteredTodos.length > 0 && (
            <Fragment>
              <v-list>
                {this.filteredTodos.map((todo) => (
                  <Item todo={todo} actions={this.actions} />
                ))}
              </v-list>
              <v-divider />
            </Fragment>
          )}
          <v-row>
            <v-col cols="6" sm="6">
              <strong>{this.remaining}</strong>
              {this.$t('todo.item_unit', {
                unit: pluralize(this.remaining, ''),
              })}
            </v-col>
            <v-col cols="6" sm="6" align="right">
              <v-btn
                small
                color="error"
                onClick={() => this.actions.clearCompleted()}
                v-show={this.filteredTodos.length > this.remaining}
              >
                {this.$t('todo.clear')}
              </v-btn>
            </v-col>
          </v-row>
        </section>
      </Fragment>
    );
  },
});

type Props = ComponentProps<typeof Component>;
export default vts.ofType<Props>().convert(Component);
</script>

<style lang="scss" scoped>
.v-application--is-ltr
  .v-tabs-bar.v-tabs-bar--is-mobile:not(.v-tabs-bar--show-arrows)
  > .v-slide-group__wrapper
  > .v-tabs-bar__content
  > .v-tabs-slider-wrapper
  + .v-tab {
  margin-left: inherit;
}

::v-deep .v-tabs-bar {
  height: 36px;
}

.filter {
  .col-6 {
    padding: 0;
  }
}

.toggle-all {
  padding-left: 16px;
  margin-bottom: 16px;
}
</style>
