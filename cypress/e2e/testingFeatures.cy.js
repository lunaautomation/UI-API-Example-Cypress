import randomInt from '../support/helpers';
import userDetailsResponse from '../support/schemas/createUserResponse';
describe('UI Tests', function () {
  beforeEach(function () {
    cy.visit(Cypress.env('baseUrl'));
  });

  it('Check Challenging DOM page has not changed using screenshot comparison', () => {
    cy.contains('Challenging DOM')
      .click()
      .then(() => {
        cy.document().matchImageSnapshot({
          failureThreshold: 0.03,
          failureThresholdType: 'percent',
          customDiffConfig: { threshold: 0.2 },
          capture: 'viewport',
        });
        cy.get('.button.alert')
          .should('exist')
          .click()
          .then(() => {
            cy.contains('Challenging DOM').then(() => {
              cy.document().matchImageSnapshot({
                failureThreshold: 0.03,
                failureThresholdType: 'percent',
                customDiffConfig: { threshold: 0.2 },
                capture: 'viewport',
              });
            });
          });
      });
  });

  it('Check element id changes after red button click', function () {
    cy.contains('Challenging DOM').click();
    //State Before
    cy.get('.button').first().as('buttonBefore');
    cy.get('.button.alert').as('alertButton');
    cy.get('.button.success').as('successButton');
    cy.get('.button.alert')
      .click()
      .then(() => {
        //State After
        cy.get('.button').first().as('buttonAfter');
        cy.get('.button.alert').as('alertButtonAfter');
        cy.get('.button.success')
          .as('successButtonAfter')
          .then(() => {
            assert.notEqual(this.buttonBefore[0].id, this.buttonAfter[0].id);
            assert.notEqual(this.alertButton[0].id, this.alertButtonAfter[0].id);
            assert.notEqual(this.successButton[0].id, this.alertButtonAfter[0].id);
          });
      });
  });

  it("Check 'Hello World' appears after loader", function () {
    cy.contains('Dynamic Loading').click();
    cy.contains('Example 2: Element rendered after the fact').click();
    cy.get('#start > button').click();
    cy.get('#loading').should('be.visible').and('contain', 'Loading... ');
    cy.get('#finish')
      .should('be.visible')
      .and('contain', 'Hello World!')
      .should($el => {
        expect($el).to.be.visible;
      });
  });
});

describe.skip('API Tests with AJV', function () {
  it('Check you can create a new unique user', function () {
    let rng = randomInt(1000);
    cy.createNewUser('Dave' + rng, '4555', '33').then(response => {
      cy.validateSchema(userDetailsResponse, response.body);
      expect(response.body.status).to.contains('success');
      expect(response.body.data.name).to.contains('Dave' + rng);
      expect(response.body.data.salary).to.contains('4555');
      expect(response.body.data.age).to.contains('33');
    });
  });
});
