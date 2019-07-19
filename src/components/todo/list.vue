<script lang="tsx">
import { CreateElement } from 'vue';
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
  public template(h: CreateElement, self: ListComponent.Logic) {
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
        <section v-show={self.state.todos.length} class="main">
          <label>
            <input
              class="toggle-all"
              type="checkbox"
              checked={self.allChecked}
              onChange={() =>
                self.actions.toggleAll({ done: !self.allChecked })
              }
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
