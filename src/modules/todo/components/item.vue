<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo(todo)">
      <label v-text="todo.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="removeTodo(todo)">remove</button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import Todo from '../store/state/todo';
import { Actions } from '../../../mixins/store_helper';
import { TodoActions } from '../store/actions';
import { HTMLElementEvent } from '../../../types';

@Component({
  components: {},
  directives: {
    focus(el, value, vnode) {
      if (value) {
        el.focus();
      }
    },
  },
})
export default class Item extends Vue {
  @Prop()
  public todo!: Todo;
  @Prop()
  public actions!: Actions<TodoActions>;

  public editing: boolean = false;

  public editTodo(text: string) {
    return this.actions.editTodo({todo: this.todo, text});
  }

  public toggleTodo() {
    this.actions.toggleTodo({todo: this.todo});
  }

  public removeTodo() {
    this.actions.removeTodo({todo: this.todo});
  }

  public doneEdit(e: HTMLElementEvent<HTMLInputElement>) {
    const value = e.target.value.trim();

    if (!value) {
      this.removeTodo();
    } else if (this.editing) {
      this.editTodo(value);
      this.editing = false;
    }
  }

  public cancelEdit(e: HTMLElementEvent<HTMLInputElement>) {
    e.target.value = this.todo.text;
    this.editing = false;
  }

}
</script>
