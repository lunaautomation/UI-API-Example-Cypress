import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import { validateSchema } from './helpers';

addMatchImageSnapshotCommand();

Cypress.Commands.add('validateSchema', validateSchema);

Cypress.Commands.add('createNewUser', (name, salary, age) => {
  cy.request({
    body: {
      name: name,
      salary: salary,
      age: age,
    },
    method: 'POST',
    url: `${Cypress.env('apiUrl')}v1/create`,
  });
});

addMatchImageSnapshotCommand({
    failureThreshold: 0.5,
    failureThresholdType: 'percent',
    customDiffConfig: { threshold: 0.5 },
    capture: 'viewport',
    customSnapshotsDir: './cypress/screenshots/baseImages',
  });