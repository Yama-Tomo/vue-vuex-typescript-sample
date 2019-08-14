/* eslint-disable @typescript-eslint/no-var-requires */
import merge from 'lodash/merge';

const dictionary = merge(
  require('~/i18n/yml/ja.yml'),
  require('~/i18n/yml/todo/ja.yml')
);

export default dictionary;
