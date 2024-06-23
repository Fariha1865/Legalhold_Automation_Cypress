class SharedSelectors{

    getSubmitButton(){

        return cy.get("input[type='submit']");
    }
    
    getPageHeader(){

        return cy.get('.page-header')
    }

    getMenubarItems(){
        return cy.get('.menu-item');
    }
}
export default SharedSelectors;