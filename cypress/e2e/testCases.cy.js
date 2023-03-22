function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

describe('Testovací scénáře', () => {
  beforeEach(() => {
    cy.login('lenka.baricova@post.cz', 'HXSV6');
  });

  it('Add new Contact non complete', () => {
    cy.get('button.el-button.el-button--default.el-button--warning').contains('Přidat kontakt').click()
    cy.get('h1.h1').contains('Nový kontakt')
    cy.get('input[name="invoice_attributes_name"][placeholder="Vyhledejte firmu podle názvu"]').type(`Lenka Silná-${getRandomNumber()}`)
    cy.get('button.el-button').contains('Uložit změny').click()
  });

  it('Add new Contact from list', () => {
    cy.get('button.el-button.el-button--default.el-button--warning').contains('Přidat kontakt').click()
    cy.get('h1.h1').contains('Nový kontakt')
    cy.get('input[name="invoice_attributes_name"][placeholder="Vyhledejte firmu podle názvu"]').type(`Lenka Silná`)
    cy.get('div.autocomplete-item').contains('Krušovice').click()
    cy.get('button.el-button').contains('Uložit změny').click()
    cy.get('.el-alert')
  });

  it('Make invoice to contact', () => {
    cy.get('h1.h1').contains('Seznam kontaktů')
    cy.contains('td', 'ABCD')
    .parent('tr')
    .children('td')
    .find('button.el-button.el-tooltip.el-button--default.el-button--icon')
    .find('i.icon.icon-new-invoice')
    .click({force: true})
    cy.get('.form-actions > :nth-child(2) > :nth-child(2)').contains('Uložit').click()
    cy.get('li.navbar-navigation__item').contains('Kontakty').click()
    cy.url().should('contain', '/kontakty')
  });

  it('Edit contact', () => {
    cy.get('h1.h1').contains('Seznam kontaktů')
    cy.contains('td', 'ABCD')
    .parent('tr')
    .children('td')
    .find('button.el-button.el-tooltip.el-button--default.el-button--icon')
    .find('i.icon.icon-edit')
    .click({force: true})
    cy.get('input[name="invoice_attributes_name"][placeholder="Vyhledejte firmu podle názvu"]').clear().type('ABCD')
    cy.get('#invoice_attributes_phone').clear().type('-420 444 444 444')
    cy.get('button.el-button').contains('Uložit změny').click()
    cy.get('h1.h1').contains('Seznam kontaktů')
  });

  it('Delete contact and cancel', () => {
    cy.get('h1.h1').contains('Seznam kontaktů')
    cy.contains('td', 'Lenka Silná')
    .parent('tr')
    .children('td')
    .find('button.el-button.el-tooltip.el-button--default.el-button--icon')
    .find('i.icon.icon-trash-can')
    .click({force: true})
    cy.get('.el-dialog__footer > div > :nth-child(1)')
    cy.get('h1.h1').contains('Seznam kontaktů')
  });

  it('Delete contact success', () => {
    cy.get('h1.h1').contains('Seznam kontaktů')
    cy.contains('td', 'Lenka Silná')
    .parent('tr')
    .children('td')
    .find('button.el-button.el-tooltip.el-button--default.el-button--icon')
    .find('i.icon.icon-trash-can')
    .click({force: true})
    cy.get('button.el-button').contains('Ano smazat').click()
    cy.get('.el-alert')
  });

  it('Find by exist text', () => {
    cy.get('h1.h1').contains('Seznam kontaktů')
    cy.get('input[name="search"]').type('HKJ')
    cy.get('tr.el-table__row').should('have.length', 2)
  });

  it('Find by nonexist text', () => {
    cy.get('h1.h1').contains('Seznam kontaktů')
    cy.get('input[name="search"]').type('eee')
    cy.get('div.empty-message')
    cy.get('input[name="search"]').clear()
  });

});
