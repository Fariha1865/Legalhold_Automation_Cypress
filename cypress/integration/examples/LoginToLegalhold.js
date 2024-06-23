/// <reference types="cypress"/>
import 'cypress-data-session';
import SharedSelectors from '../PageObjects/SharedSelectors';
import CasePage from '../PageObjects/CasePage';
import TemplatePage from '../PageObjects/TemplatePage';

describe('Consilio Tests', () => {

    let values;

    before(() => {
        cy.fixture("values").then((loadedValues) => {
            values = loadedValues

        })
    })
    // Set up the session once before all tests
    beforeEach(() => {

        Cypress.config('pageLoadTimeout', 15000)
        cy.session('login', () => {
            cy.login(values);
            cy.navigateToLegalHold(values)
        });
    });

    it('Maintain session and perform actions on Case page', () => {

        const sharedSelectors = new SharedSelectors();
        const casePage = new CasePage();
        

        cy.visit('/');  // Visiting the page as part of the test
        cy.wait(2000);
        cy.url().should('include', values.legalHoldLandingPageUrl);
        sharedSelectors.getPageHeader().should('contain.text', values.legalHoldLandingPageHeader)
        casePage.getCreateCaseButton().click();

        //cy.get("button[aria-label='Cancel Button']").click({force:true})
        cy.reload()
        sharedSelectors.getMenubarItems().eq(2).click()
   

    });

    it('template', () => {
        const templatePage = new TemplatePage();
        
        cy.visit('https://legalholdpt.consilio.com/Template')
        cy.wait(5000)
        templatePage.getCreateTemplateButton().click()
    })
});

