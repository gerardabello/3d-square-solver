const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override (config, env) {
  config = injectBabelPlugin(['emotion', { inline: true }], config)
  return config
}
