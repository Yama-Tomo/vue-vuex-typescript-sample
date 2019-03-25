#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const tsConfigPath = path.resolve('./tsconfig.json');
const disabledTsConfigPath = path.resolve('./tsconfig.json.disable');

const disableTsNode = () => {
  if (fs.existsSync(tsConfigPath)) {
    fs.renameSync(tsConfigPath, disabledTsConfigPath);
  }
};

const restoreTsConfig = () => {
  if (fs.existsSync(disabledTsConfigPath) && !process.env.NO_RESTORE_TSCONFIG) {
    fs.renameSync(disabledTsConfigPath, tsConfigPath);
  }
};

disableTsNode();
process.on('SIGINT', () => process.exit(0));
process.on('exit', () => restoreTsConfig());

require('./node_modules/.bin/nuxt');
