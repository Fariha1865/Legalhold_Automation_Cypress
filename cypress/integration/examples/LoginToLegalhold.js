// cypress spec file
/// <reference types="cypress"/>
import selectors from "../../support/selectors/Login.js";
import values from "../../support/Values.js";

describe('Login to sightline', () => {

     beforeEach(() => {
          // Calling the login custom command before each test suite
          cy.login();
        });

     it('Verifying successful login with URL', () => {

          cy.wait(2000)
          cy.url().should('include', values.loginVerificationUrl);

     })
     it('Navigating to LegalHold as Domain Admin',()=>{
          
     })
});
