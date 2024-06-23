class Impersonation{

    getImpersonationAvailableRoles(){
        return cy.get('#ddlAvailableRoles');
    }
    
    getImpersonationAvailableDomains(){

          return cy.get('#ddlAvailableDomains');
    }
}

export default Impersonation;