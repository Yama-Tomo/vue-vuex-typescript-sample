// require absolute path
const basePath = '/path/to/application/'

module.exports = {
  apps : [{
    name            : 'nuxt-sample-app',
    cwd             : `${basePath}/current`,
    script          : 'server/index.js',
    exec_mode       : 'cluster',
    instances       : 2,
    wait_ready      : true,
    listen_timeout  : 10000,
    kill_timeout    : 5000,
    error_file      : `${basePath}/logs/err.log`,
    out_file        : `${basePath}/logs/out.log`,
    merge_logs      : true,
    log_date_format : 'YYYY-MM-DD HH:mm Z'
  }],
}