<script lang='tsx'>
import { CreateElement } from 'vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import Todo from '../store/state/todo';
import { Actions } from '../../../mixins/store_helper';
import { TodoActions } from '../store/actions';
import { HTMLElementEvent } from '../../../types';
import * as vts from 'vue-tsx-support';

const template = (h: CreateElement, self: Item) => {
  return (
    <li
      class={ [
        'todo',
        ...self.todo.done ? ['completed'] : [],
        ...self.editing ? ['editing'] : [],
      ].join(' ') }
    >
      <div class='view'>
         <input class='toggle' type='checkbox'
           checked={ self.todo.done }
           onChange={ () => self.toggleTodo() }
         />
        <label onDblclick={ () => self.changeEditMode() }>
          { self.todo.text }
        </label>
        <button class='destroy' onClick={ () => self.removeTodo() }>remove</button>
      </div>
      <input class='edit' ref='inputText' value={ self.todo.text }
        v-show={ self.editing }
        onKeyup={ (e) => self.onKeyup(e) }
        onBlur={ (e) => self.doneEdit(e) }
      />
    </li>
  );
};


@Component
export class Item extends Vue {
  @Prop()
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
    return this.actions.editTodo({todo: this.todo, text});
  }

  public toggleTodo() {
    this.actions.toggleTodo({todo: this.todo});
  }

  public removeTodo() {
    this.actions.removeTodo({todo: this.todo});
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