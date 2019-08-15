<script lang="tsx">
import { Component } from 'nuxt-property-decorator';
import * as vts from 'vue-tsx-support';
import Item from './item.vue';
import * as ListComponent from './list/component';
import { objectToArray, pluralize } from '@/components/todo/list/functions';

@Component({
  components: {
    Item,
  },
})
class List extends ListComponent.Logic {
  public render() {
    return (
      <section class="todoapp">
        <header class="header">
          <h1>{this.$t('todo.title')}</h1>
          <input
            class="new-todo"
            autofocus
            autocomplete="off"
            placeholder={this.$t('todo.input_placeholder').toString()}
            onKeypress={e => this.addTodo(e)}
          />
        </header>
        <section v-show={this.state.todos.length} class="main">
          <label>
            <input
              class="toggle-all"
              type="checkbox"
              checked={this.allChecked}
              onChange={() =>
                this.actions.toggleAll({ done: !this.allChecked })
              }
            />
            select all
          </label>
          <ul class="todo-list">
            {this.filteredTodos.map(todo => (
              <Item todo={todo} actions={this.actions} />
            ))}
          </ul>
        </section>
        <footer v-show={this.state.todos.length} class="footer">
          <span class="todo-count">
            <strong>{this.remaining}</strong>
            {this.$t('todo.item_unit', {
              unit: pluralize(this.remaining, ''),
            })}
          </span>
          <ul class="filters">
            {objectToArray(this.filters).map(filter => (
              <li>
                {this.visibility === filter.key ? (
                  this.$t(`todo.filter.${filter.key}`)
                ) : (
                  <a
                    href={`#/${filter.key}`}
                    class={this.visibility === filter.key ? 'selected' : ''}
                    onClick={() => {
                      this.visibility = filter.key;
                    }}
                  >
                    {this.$t(`todo.filter.${filter.key}`)}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <button
            v-show={this.state.todos.length > this.remaining}
            class="clear-completed"
            onClick={() => this.actions.clearCompleted({})}
          >
            {this.$t('todo.clear')}
          </button>
        </footer>
      </section>
    );
  }
}

export default vts.ofType<ListComponent.Props>().convert(List);
</script>

<style lang="scss" scoped>
ul.filters {
  padding: 0;

  li {
    &:not(:last-child) {
      margin-right: 10px;
    }
    display: inline-block;
  }
}
</style>
