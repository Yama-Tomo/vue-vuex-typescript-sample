<script lang="tsx">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { CreateElement } from 'vue';
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

const template = (h: CreateElement, self: Item) => {
  return (
    <li class={liClass(self.todo, self.editing)}>
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          checked={self.todo.done}
          onChange={() => self.toggleTodo()}
        />
        <label onDblclick={() => self.changeEditMode()}>{self.todo.text}</label>
        <button class="destroy" onClick={() => self.removeTodo()}>
          {self.$t('todo.remove')}
        </button>
      </div>
      <input
        v-show={self.editing}
        ref="inputText"
        class="edit"
        value={self.todo.text}
        onKeyup={e => self.onKeyUp(e)}
        onKeypress={e => self.onKeyPress(e)}
        onBlur={e => self.doneEdit(e)}
      />
    </li>
  );
};

@Component
class Item extends Vue {
  @Prop(Object)
  public todo!: Todo;
  @Prop()
  public actions!: Actions<TodoActions>;

  public editing: boolean = false;

  public render(h: CreateElement) {
    return template(h, this);
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
