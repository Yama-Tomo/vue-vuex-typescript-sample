/* eslint-disable @typescript-eslint/no-var-requires */
import merge from 'lodash/merge';

const dictionary = merge(
  require('~/i18n/yml/en.yml'),
  require('~/i18n/yml/todo/en.yml')
);

export default dictionary;
