<script lang="tsx">
import Vue, { PropType } from 'vue';
import * as vts from 'vue-tsx-support';
import { HTMLElementEvent, ComponentProps } from '@/types';
import { Todo } from '@/modules/todo/store';
import { ActionTree } from '@/modules/store';

type LocalState = {
  editing: boolean;
};

const Component = Vue.extend({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      default: undefined,
    },
    actions: {
      type: Object as PropType<ActionTree['todoModule']>,
      default: undefined,
    },
  },
  data(): LocalState {
    return {
      editing: false,
    };
  },
  methods: {
    changeEditMode() {
      this.editing = true;
      this.$nextTick(() => (this.$refs.inputText as HTMLInputElement).focus());
    },
    editTodo(text: string) {
      return this.actions.editTodo({ todo: this.todo, text });
    },
    toggleTodo() {
      this.actions.toggleTodo(this.todo);
    },
    removeTodo() {
      this.actions.removeTodo(this.todo);
    },
    onKeyup(e: Event) {
      const keyCode = (e as KeyboardEvent).key;
      if (keyCode === 'Enter') {
        this.doneEdit(e);
      }

      if (keyCode === 'Escape') {
        this.cancelEdit(e);
      }
    },
    doneEdit(e: Event) {
      const value = (e as HTMLElementEvent<
        HTMLInputElement
      >).target.value.trim();

      if (!value) {
        this.removeTodo();
      } else if (this.editing) {
        this.editTodo(value);
        this.editing = false;
      }
    },
    cancelEdit(e: Event) {
      (e as HTMLElementEvent<HTMLInputElement>).target.value = this.todo.text;
      this.editing = false;
    },
  },
  render() {
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
            onChange={this.toggleTodo}
          />
          <label onDblclick={this.changeEditMode}>{this.todo.text}</label>
          <button class="destroy" onClick={this.removeTodo}>
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
  },
});

type Props = ComponentProps<typeof Component>;
export default vts.ofType<Props>().convert(Component);
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
