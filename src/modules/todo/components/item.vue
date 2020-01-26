<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import * as vts from 'vue-tsx-support';
import { HTMLElementEvent } from '../../../types/dom';
import { Todo } from '@/modules/todo/store';
import { ActionTree } from '@/modules/module_mapper';

@Component
export class Item extends Vue {
  @Prop()
  public todo!: Todo;

  @Prop()
  public actions!: ActionTree['todoModule'];

  public editing = false;

  public render() {
    return (
      <li
        class={[
          'todo',
          ...(this.todo.done ? ['completed'] : []),
          ...(this.editing ? ['editing'] : []),
        ].join(' ')}
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            checked={this.todo.done}
            onChange={() => this.toggleTodo()}
          />
          <label onDblclick={() => this.changeEditMode()}>
            {this.todo.text}
          </label>
          <button class="destroy" onClick={() => this.removeTodo()}>
            remove
          </button>
        </div>
        <input
          class="edit"
          ref="inputText"
          value={this.todo.text}
          v-show={this.editing}
          onKeyup={e => this.onKeyup(e)}
          onBlur={e => this.doneEdit(e)}
        />
      </li>
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
    this.actions.toggleTodo(this.todo);
  }

  public removeTodo() {
    this.actions.removeTodo(this.todo);
  }

  public onKeyup(e: Event) {
    const keyCode = (e as KeyboardEvent).key;
    if (keyCode === 'Enter') {
      this.doneEdit(e);
    }

    if (keyCode === 'Escape') {
      this.cancelEdit(e);
    }
  }

  public doneEdit(e: Event) {
    const value = (e as HTMLElementEvent<HTMLInputElement>).target.value.trim();

    if (!value) {
      this.removeTodo();
    } else if (this.editing) {
      this.editTodo(value);
      this.editing = false;
    }
  }

  public cancelEdit(e: Event) {
    (e as HTMLElementEvent<HTMLInputElement>).target.value = this.todo.text;
    this.editing = false;
  }
}

export default vts.ofType<Partial<Item>>().convert(Item);
</script>

<style lang="scss" scoped>
label {
  padding-right: 10px;
  padding-left: 10px;
}

.editing {
  label {
    color: #888;
  }
}

.completed {
  label {
    text-decoration: line-through;
  }
}
</style>
