describe('UI Tests', function () {
  beforeEach(function () {
    cy.visit("https://the-internet.herokuapp.com/")
  });

  it('Check element id changes after red button click', function () {
    cy.contains('Challenging DOM').click();
      cy.get('.button').as('button')
        .then( () => {
        cy.get('.button.alert').click()
          .then( () => {
            cy.get('.button').as('buttonAfter')
              .get('@button','@buttonAfter').then( () => {
                assert.notEqual(this.button[0].id, this.buttonAfter[0].id);
              assert.notEqual(this.button[1].id, this.buttonAfter[1].id);
              assert.notEqual(this.button[2].id, this.buttonAfter[2].id);
              })
          })
      });
  });

  it('Check \'Hello World\' appears after AJAX loader', function () {
    cy.contains('Dynamic Loading').click();
    cy.contains('Example 2: Element rendered after the fact').click();
    cy.get('#start > button').click();
    cy.get('#loading').should('be.visible').and('contain', 'Loading... ');
    cy.get('#finish',).should('contain','Hello World!');
  });
});

describe('API Tests', function() {
  it('check you can create a user', function () {
    let rng = Math.floor((Math.random() * 100000000) + 1);
    cy.request({
      body: {
        name: 'Dave' + rng,
        salary: '1222',
        age: '66',
      },
      method: 'POST',
      url: 'http://dummy.restapiexample.com/api/v1/create',
    }).then((response) => {
      expect(response.body.name).to.contains('Dave'+rng);
      expect(response.body.salary).to.contains('1222');
      expect(response.body.age).to.contains('66');
    })
  });
});
