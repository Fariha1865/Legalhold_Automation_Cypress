/// <reference types="cypress"/>
import selectors from "../../support/selectors/LoginSelectors.js";
import impersonationSelectors from "../../support/selectors/impersonation/Impersonation.js";
import sharedSelectors from "../../support/selectors/shared/SharedSelectors.js";
import values from "../../support/Values.js";
import 'cypress-data-session';

describe('Consilio Tests', () => {
    // Set up the session once before all tests
    beforeEach(() => {
        cy.session('login', () => {
            cy.login();
        });
    });



        it('Verifying successful login and navigate to Legalhold', () => {
            cy.visit('https://sightlinept1.consilio.com/User/UserListView');
            cy.wait(2000);
            cy.url().should('include', values.loginVerificationUrl);
            cy.get(selectors.userPageTitle).should('include.text', values.userPageTitle);

            cy.get(selectors.userSelectorIcon).click();
            cy.get(selectors.userSelectorDropdown).find(selectors.userSelectorOptions).each(($el) => {
                if ($el.text() === values.impersonationOptionText) {
                    cy.wrap($el).click();
                }
            });

            cy.wait(2000);

            cy.get(impersonationSelectors.impersonationAvailableRoles).select(values.impersonationRole);
            cy.get(impersonationSelectors.impersonationAvailableDomains).select(values.impersonationDomain);

            cy.get(sharedSelectors.submitButton).contains('Save').click();

            cy.wait(2000);

            cy.get(selectors.projectSelectorDropdown).should('have.text', values.selectedProjectName);

            cy.get(selectors.switchProjectIcon).click();
            cy.get(selectors.legalHoldIcon).click();
            cy.wait(3000);
            cy.url().should('include', values.legalHoldLandingPageUrl);
            cy.get(sharedSelectors.pageHeader).should('include.text', values.legalHoldLandingPageHeader);

         
        });

        it('Maintain session and perform actions on Case page', () => {
           
                cy.visit('/');  // Visiting the page as part of the test
                cy.get(selectors.projectSelectorDropdown).should('have.text', values.selectedProjectName);

                cy.get(selectors.switchProjectIcon).click();
                cy.get(selectors.legalHoldIcon).click();
    
                cy.wait(2000);
                cy.url().should('include', values.legalHoldLandingPageUrl);
                cy.get('#btnCreateCase').click();
                // Add additional validations as needed
           
        });
    });

