// cypress spec file
/// <reference types="cypress"/>
import selectors from "../../support/selectors/LoginSelectors.js";
import impersonationSelectors from "../../support/selectors/impersonation/Impersonation.js"
import sharedSelectors from "../../support/selectors/shared/SharedSelectors.js";
import values from "../../support/Values.js";

describe('Login to sightline', () => {

     before(() => {
          // Calling the login custom command before each test suite
          cy.login();
        });

     it('Verifying successful and navigate to Legalhold', () => {

          cy.wait(2000)
          cy.url().should('include', values.loginVerificationUrl);
          cy.get(selectors.userPageTitle).should('include.text',values.userPageTitle)

          cy.get(selectors.userSelectorIcon).click()
          cy.get(selectors.userSelectorDropdown).find(selectors.userSelectorOptions).each(($el,index,list)=>{
                
                 if($el.text()=== values.impersonationOptionText)
                 {
                    cy.wrap($el).click()
                 }
          })

          cy.wait(2000)

          cy.get(impersonationSelectors.impersonationAvailableRoles).select(values.impersonationRole)
          cy.get(impersonationSelectors.impersonationAvailableDomains).select(values.impersonationDomain)

          cy.get(sharedSelectors.submitButton).contains('Save').click()

          cy.wait(2000)

          cy.get(selectors.projectSelectorDropdown).should('have.text',values.selectedProjectName)

          cy.get(selectors.switchProjectIcon).click()
          cy.get(selectors.legalHoldIcon).click()
          cy.wait(3000)
          cy.url().should('include', values.legalHoldLandingPageUrl);
          cy.get(sharedSelectors.pageHeader).should('include.text',values.legalHoldLandingPageHeader)

     })

});
