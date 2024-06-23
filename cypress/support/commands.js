/// <reference types="cypress"/>

import LoginPage from "../integration/PageObjects/LoginSelectors.js";
import Impersonation from "../integration/PageObjects/Impersonation.js";
import SharedSelectors from "../integration/PageObjects/SharedSelectors.js";

// Providing username and password to login (with handling active sessions)
Cypress.Commands.add('login', (values) => {
    const loginPage = new LoginPage();

    function insertLoginCredentials() {
        loginPage.getLoginUsername().type(values.login_username);
        loginPage.getLoginPassword().type(values.login_password);
        loginPage.getLoginButton().click({ force: true });
    }

    cy.visit("https://sightlinept1.consilio.com");
    insertLoginCredentials();

    // Checking for the presence of the active session toast
    cy.get('body').then($body => {
        Cypress.on('uncaught:exception', (err, runnable) => {
         
            if (err.message.includes("Cannot read properties of null (reading 'style')")) {
                return false;
            }
           
            return true;
        });

        const activeSessionToast = $body.find(loginPage.getActiveSessionToast());
        cy.wrap(activeSessionToast).then($toast => {
            if ($toast.length > 0) {
                cy.wrap(activeSessionToast).should('be.visible').then(() => {
                    loginPage.getActiveSessionYesBtn().click();
                    cy.wait(2000);
                    insertLoginCredentials();
                });
            } else {
                cy.log("No active sessions, logged in successfully");
            }
        });
    });
});

Cypress.Commands.add('navigateToLegalHold', (values) => {
    const loginPage = new LoginPage();
    const impersonation = new Impersonation();
    const sharedSelectors = new SharedSelectors()

    loginPage.getUserSelectorIcon().click();
    loginPage.getUserSelectorDropdown().find(loginPage.getUserSelectorOptions()).each(($el) => {
        if ($el.text() === values.impersonationOptionText) {
            cy.wrap($el).click();
        }
    });

    cy.wait(2000);
    impersonation.getImpersonationAvailableRoles().select(values.impersonationRole);
    impersonation.getImpersonationAvailableDomains().select(values.impersonationDomain);

    sharedSelectors.getSubmitButton().contains('Save').click();
    cy.wait(2000);
    loginPage.getProjectSelectorDropdown().should('have.text', values.selectedProjectName);
    loginPage.getSwitchProjectIcon().click();
    loginPage.getLegalHoldIcon().click();
    cy.wait(3000);
    cy.url().should('include', values.legalHoldLandingPageUrl);
});
