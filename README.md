# vuex tutorial + typescript + nuxt.js

[![CircleCI](https://circleci.com/gh/Yama-Tomo/vue-vuex-typescript-sample/tree/nuxt.svg?style=shield)](https://circleci.com/gh/Yama-Tomo/vue-vuex-typescript-sample/tree/nuxt)
[![codecov](https://codecov.io/gh/Yama-Tomo/vue-vuex-typescript-sample/branch/nuxt/graph/badge.svg)](https://codecov.io/gh/Yama-Tomo/vue-vuex-typescript-sample)

:arrow_right: [vue.js only branch](https://github.com/Yama-Tomo/vue-vuex-typescript-sample/tree/vue)

## get started

- create .env file
  - This repository include `.env.sample` file

  ```bash
  $ cp .env.sample .env
  $ # customize your .env file
  ```

- enable yarn wrapper shell

  ```bash
  $ source .npm_scripts/yarn-with-dotenv
  ```

- starting server

  ```bash
  $ docker-compose up -d
  ```

  or, If you want to launch nuxt server on host machine.

  ```bash
  $ docker-compose up -d backend
  $ yarn && yarn dev
  ```

- test

  ```bash
  $ docker-compose run puppeteer sh -c 'yarn && yarn sb:build && yarn test'
  ```

  or, If you want to run jest on host machine.

  ```bash
  $ yarn && yarn sb:build && yarn test
  ```

  NOTICE: visual tests are skipped when run test on host machine. Because occurs test result difference when use the puppeteer installed on each platform

## note

This repository is manage expect files of snapshot testing by `git lfs`, so you need to install git lfs.

Already installed git hooks by husky if you already clone this repository, In that case, please install the hooks manually by `git lfs update --manual` after install `git lfs`
