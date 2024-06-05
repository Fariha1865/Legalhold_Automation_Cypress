const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here
    },

    specPattern: 'cypress/integration/examples/*.js',
    experimentalSessionAndOrigin: true,
    preserveCookies: true,
    pageLoadTimeout: 12000,
    baseUrl: 'https://legalholdpt.consilio.com/Case'

  },
  
});
