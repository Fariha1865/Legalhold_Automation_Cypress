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
            cy.navigateToLegalHold()
        });
    });

        it('Maintain session and perform actions on Case page', () => {
           
                cy.visit('/');  // Visiting the page as part of the test
                cy.wait(2000);
                cy.url().should('include', values.legalHoldLandingPageUrl);
                cy.get('#btnCreateCase').click();

                // cy.get("button[aria-label='Cancel Button']").click({force:true})
                cy.get('#CreateCaseFormId > .modal-footer > .btn-white').click({force:true})
                cy.get('.menu-item').eq(2).click()
                // Add additional validations as needed
           
        });

        it('template',()=>{
            cy.visit('https://legalholdpt.consilio.com/Template')
            cy.wait(5000)
            cy.get('#add-new-template-btn').click()
        })
    });

