import { storiesOf } from '@storybook/vue';
import * as Helper from '../../helper';
import Item from '@/components/todo/item.vue';
import { StoreHelper } from '@/mixins/store_helper';
import * as Mapper from '@/store_modules/module_mapper';

storiesOf('components.todo.item', module).add('default', () => {
  const store = Helper.store();
  const actions = StoreHelper.getActions(store, Mapper.modules.todo);

  return {
    components: { Item },
    template: '<Item :actions=actions :todo=todo />',
    store,
    data: () => ({
      todo: { text: 'aaaa', done: true },
      actions,
    }),
    i18n: Helper.i18n(),
  };
});
