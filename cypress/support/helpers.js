import Ajv from 'ajv';
import { definitionsHelper } from './formats/schema-definitions';

export default function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const getSchemaError = getAjvError => {
  return cy.wrap(`Field: ${getAjvError[0].dataPath} is invalid. Cause: ${getAjvError[0].message}`);
};

export const validateSchema = (schema, response) => {
  console.log('here' + schema);
  const ajv = new Ajv();
  const validate = ajv.addSchema(definitionsHelper).compile(schema);
  const valid = validate(response);

  if (!valid) {
    cy.log(validate.errors);
    getSchemaError(validate.errors).then(schemaError => {
      throw new Error(schemaError);
    });
  } else {
    cy.log('Schema validated!');
  }
};
