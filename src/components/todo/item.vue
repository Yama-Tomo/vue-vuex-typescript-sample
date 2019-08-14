<script lang="tsx">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import * as vts from 'vue-tsx-support';
import { Todo } from '../../store_modules/todo/state/todo';
import { Actions } from '../../mixins/store_helper';
import { TodoActions } from '../../store_modules/todo/actions';
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
  public actions!: Actions<TodoActions>;

  public editing = false;

  public render() {
    return (
      <li class={liClass(this.todo, this.editing)}>
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
            {this.$t('todo.remove')}
          </button>
        </div>
        <input
          v-show={this.editing}
          ref="inputText"
          class="edit"
          value={this.todo.text}
          onKeyup={e => this.onKeyUp(e)}
          onKeypress={e => this.onKeyPress(e)}
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
    this.actions.toggleTodo({ todo: this.todo });
  }

  public removeTodo() {
    this.actions.removeTodo({ todo: this.todo });
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
