export const definitionsHelper = {
  $id: 'customDefinitions',
  definitions: {
    dateTime: {
      type: 'string',
      examples: ['0001-01-01T00:00:00Z'],
      pattern: '^(\\d{4})-(\\d{2})-(\\d{2})(T)(\\d{2}):(\\d{2}):(\\d{2})(Z)$',
    },
    uuid: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      examples: ['ffffffff-ffff-ffff-ffff-ffffffffffff'],
    },
  },
};
