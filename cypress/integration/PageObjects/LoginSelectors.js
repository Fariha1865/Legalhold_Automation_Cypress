class LoginPage {

    getLoginUsername() {
        return cy.get('#txtBxUserID');
    }

    getLoginPassword() {
        return cy.get('#txtBxUserPass');
    }

    getLoginButton() {
        return cy.get("button[aria-label='LOGIN']");
    }

    getActiveSessionToast() {
        return '.MessageBoxMiddle h2 span.MsgTitle';
    }

    getActiveSessionYesBtn() {
        return cy.get('#bot1-Msg1');
    }

    getUserPageTitle() {
        return cy.get('.page-title');
    }

    getUserSelectorIcon() {
        return cy.get('#user-selector');
    }

    getUserSelectorDropdown() {
        return cy.get('.dropdown-menu');
    }

    getUserSelectorOptions() {
        return "li a[role='menuitem']";
    }

    getProjectSelectorDropdown() {
        return cy.get('#project-selector');
    }

    getSwitchProjectIcon() {
        return cy.get('.LegalHold');
    }

    getLegalHoldIcon() {
        return cy.get('.sightlineLegalHold > .btn');
    }
}

export default LoginPage;
