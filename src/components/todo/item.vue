<script lang="tsx">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import * as vts from 'vue-tsx-support';
import { mdiDelete } from '@mdi/js';
import { Todo } from '@/store/todo';
import { ActionTree } from '@/store/module_mapper';
import { InputEvent } from '@/types/dom';

const liClass = (todo: Todo, editing: boolean) => {
  const stack = ['todo'];

  if (todo.done) {
    stack.push('completed');
  }

  if (editing) {
    stack.push('editing');
  }

  return stack.join(' ');
};

@Component
class Item extends Vue {
  @Prop(Object)
  public todo!: Todo;
  @Prop()
  public actions!: ActionTree['todo'];

  public editing = false;

  public render() {
    return (
      <v-list-item class={liClass(this.todo, this.editing)}>
        <v-list-item-content>
          <v-checkbox
            class="shrink mr-2 mt-0"
            hide-details
            input-value={this.todo.done}
            onChange={() => this.toggleTodo()}
          />
          <div
            class="text"
            onClick={() => this.changeEditMode()}
            v-show={!this.editing}
          >
            {this.todo.text}
          </div>
          <v-text-field
            ref="inputText"
            value={this.todo.text}
            v-show={this.editing}
            onKeyup={(e: Event) => this.onKeyUp(e)}
            onKeypress={(e: Event) => this.onKeyPress(e)}
            onBlur={(e: Event) => this.doneEdit(e)}
            hide-details
          />
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon onClick={() => this.removeTodo()}>
            <v-icon>{mdiDelete}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    );
  }

  public changeEditMode() {
    this.editing = true;
    this.$nextTick(() => (this.$refs.inputText as HTMLInputElement).focus());
  }

  public editTodo(text: string) {
    return this.actions.editTodo({ todo: this.todo, text });
  }

  public toggleTodo() {
    this.actions.toggleTodo({ todo: this.todo });
  }

  public removeTodo() {
    this.actions.removeTodo(this.todo);
  }

  public onKeyPress(e: Event) {
    const keyCode = (e as KeyboardEvent).key;
    if (keyCode === 'Enter') {
      this.doneEdit(e);
    }
  }

  public onKeyUp(e: Event) {
    const keyCode = (e as KeyboardEvent).key;
    if (keyCode === 'Escape') {
      this.cancelEdit(e);
    }
  }

  public doneEdit(e: Event) {
    const value = (e as InputEvent).target.value.trim();

    if (!value) {
      this.removeTodo();
    } else if (this.editing) {
      this.editTodo(value);
      this.editing = false;
    }
  }

  public cancelEdit(e: Event) {
    (e as InputEvent).target.value = this.todo.text;
    this.editing = false;
  }
}

type Props = Pick<Item, 'todo' | 'actions'>;
export default vts.ofType<Props>().convert(Item);
</script>

<style lang="scss" scoped>
.todo {
  &.editing {
    background-color: #fafafa;
  }

  &.completed {
    .text {
      text-decoration: line-through;
    }
  }

  .v-list-item__content {
    overflow: inherit;

    .v-input {
      padding-top: 0;
      margin-top: 0;
    }

    .text {
      display: flex;
      flex: 1;
      cursor: pointer;
    }
  }
}
</style>
