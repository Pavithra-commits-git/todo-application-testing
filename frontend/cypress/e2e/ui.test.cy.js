describe('Todo App UI Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Logs in with valid credentials', () => {
    cy.get('input').first().type('test');
    cy.get('input').last().type('password');
    cy.contains('Login').click();
    cy.contains('Add');
  });

  it('Fails login with invalid credentials', () => {
    cy.get('input').first().type('wrong');
    cy.get('input').last().type('wrong');
    cy.contains('Login').click();
    cy.on('window:alert', str => expect(str).to.equal('Login failed'));
  });

  it('Creates, edits, deletes a todo', () => {
    cy.get('input').first().type('test');
    cy.get('input').last().type('password');
    cy.contains('Login').click();

    cy.get('input').type('Buy milk');
    cy.contains('Add').click();
    cy.contains('Buy milk');

    cy.contains('Edit').click();
    cy.get('input').clear().type('Buy almond milk');
    cy.contains('Update').click();
    cy.contains('Buy almond milk');

    cy.contains('Delete').click();
    cy.contains('Buy almond milk').should('not.exist');
  });
});