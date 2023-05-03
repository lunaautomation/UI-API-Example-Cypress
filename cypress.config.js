const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 60000,
  pageLoadTimeout: 60000,
  responseTimeout: 60000,
  watchForFileChanges: false,
  video: false,
  env: {
    apiUrl:'https://dummy.restapiexample.com/api/',
    baseUrl:'https://the-internet.herokuapp.com/',
    ignoreTestFiles: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})