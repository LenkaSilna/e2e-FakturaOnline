  Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://dev.fakturaonline.cz/kontakty')
      cy.get('input#email.el-input__inner').type(	
        username)
      cy.get('input#current-password.el-input__inner').type(	
          password)
      cy.get('button.el-button--primary').contains('Přihlásit se').click()
      cy.get('li.navbar-navigation__item').contains('Kontakty').click()
      cy.url().should('contain', '/kontakty')
  })