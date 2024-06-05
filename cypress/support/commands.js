// ***********************************************
import selectors from "./selectors/LoginSelectors.js";
import values from "../support/Values.js";

// providing username and password to login(with handling active sessions
Cypress.Commands.add('login', () => {

    cy.visit("https://sightlinept1.consilio.com");
    cy.wait(2000);
    cy.get(selectors.loginUsername).type(values.login_username);
    cy.get(selectors.loginPassword).type(values.login_password);
    cy.get(selectors.loginButton).click({ force: true });

    // Checking for the presence of the active session toast
    cy.get('body').then($body => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Ignore the error and don't fail the test
            if (err.message.includes("Cannot read properties of null (reading 'style')")) {
              return false;
            }
            // Let other errors fail the test
            return true;
          });
          
        if ($body.find(selectors.activeSessionToast).length > 0) {

            cy.get(selectors.activeSessionToast).should('be.visible').then(() => {
                cy.get(selectors.activeSessionYesBtn).click();
                cy.wait(2000);
                cy.get(selectors.loginUsername).clear().type(values.login_username);
                cy.get(selectors.loginPassword).clear().type(values.login_password);
                cy.get(selectors.loginButton).click({ force: true });
            });
        } else {
            cy.log("No active sessions, logged in successfully");
        }
    });
      

})


