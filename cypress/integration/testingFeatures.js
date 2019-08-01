describe('UI Tests', function () {
  beforeEach(function () {
    cy.visit("https://the-internet.herokuapp.com/")
  });

  it('Check Challenging DOM page has not changed using screenshot comparison', () => {
    cy.contains('Challenging DOM').click()
      .then(() => {
        cy.document()
          .toMatchImageSnapshot();
      });
      cy.get('.button.alert').click()
      .then(() => {
        cy.document()
          .toMatchImageSnapshot();
      });

  });

  it('Check element id changes after red button click', function () {
    cy.contains('Challenging DOM').click();
    //State Before
    cy.get('.button').first().as('buttonBefore');
    cy.get('.button.alert').as('alertButton');
    cy.get('.button.success').as('successButton')
    cy.get('.button.alert').click();
    //State After 
    cy.get('.button').first().as('buttonAfter')
    cy.get('.button.alert').as('alertButtonAfter');
    cy.get('.button.success').as('successButtonAfter')
      .get('@buttonBefore','@buttonAfter').then( () => {
        assert.notEqual(this.buttonBefore[0].id, this.buttonAfter[0].id);
        assert.notEqual(this.alertButton[0].id, this.alertButtonAfter[0].id);
        assert.notEqual(this.successButton[0].id, this.alertButtonAfter[0].id);
      })
  });

  it('Check \'Hello World\' appears after loader', function () {
    cy.contains('Dynamic Loading').click();
    cy.contains('Example 2: Element rendered after the fact').click();
    cy.get('#start > button').click()
    cy.get('#loading').should('be.visible').and('contain', 'Loading... ');
    cy.get('#finish',).should('be.visible').and('contain','Hello World!').should($el => {
      expect($el).to.be.visible
    }); 
  });
});

describe('API Tests', function() {
  it('Check you can create a new unique user', function () {
    let rng = Math.floor((Math.random() * 100000000) + 1);
    cy.createNewUser('Dave'+rng,'4555', '33').then((response) => {
      expect(response.body.name).to.contains('Dave'+rng);
      expect(response.body.salary).to.contains('4555');
      expect(response.body.age).to.contains('33');
      expect(response.body.id).to.not.contains(null);
    })
  }); 
});