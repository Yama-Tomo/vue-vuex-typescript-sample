/* How to run with pm2 on local machine

  # setup
    - set this repository root path to basePath variable
    - run commands
      $ ln -s . current
      $ npm i -g pm2
      $ pm2 start pm2.config.js

  # graceful reload
    - $ pm2 reload nuxt-sample-app
*/

// require absolute path
const basePath = '/path/to/application/';

module.exports = {
  apps: [
    {
      name: 'nuxt-sample-app',
      cwd: `${basePath}/current`,
      script: './node_modules/.bin/nuxt',
      args: 'start -c .nuxt/ts-compiled/nuxt.config.js',
      exec_mode: 'cluster',
      instances: 2,
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
      error_file: `${basePath}/logs/err.log`,
      out_file: `${basePath}/logs/out.log`,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
