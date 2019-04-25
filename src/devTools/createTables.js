/* eslint-disable @typescript-eslint/no-var-requires */
const yaml = require('js-yaml'); // eslint-disable-line import/no-extraneous-dependencies
const fs = require('fs');
const path = require('path');
const { config, DynamoDB } = require('aws-sdk');
const { promisify } = require('util');

const readTemplate = async (filePath) => {
  const content = await promisify(fs.readFile)(path.join(__dirname, filePath), 'utf8');

  const schema = yaml.Schema.create([
    '!And', '!If', '!Not', '!Equals', '!Or', '!FindInMap', '!Base64', '!Cidr', '!Ref', '!Sub', '!GetAtt', '!GetAZs',
    '!ImportValue', '!Select', '!Split', '!Join']
    .map(tag => new yaml.Type(tag, {
      kind: 'scalar',
      resolve: () => true,
      construct: data => data,
    })));
  return yaml.load(content, { schema });
};

const getTableDefinitions = template => Object.entries(template.Resources)
  .reduce((memo, [resourceName, { Type, Properties }]) => {
    if (Type !== 'AWS::DynamoDB::Table') {
      return memo;
    }
    return memo.concat({
      TableName: resourceName,
      ...Properties,
    });
  }, []);

const createTables = async (tableDefinitions) => {
  config.update({
    region: 'ap-southeast-2',
    endpoint: 'http://localhost:8000',
  });

  const ddb = new DynamoDB();
  Promise.all(
    tableDefinitions.map(
      tableDefinition => ddb.createTable(tableDefinition).promise(),
    ),
  );
};

(async () => {
  const template = await readTemplate('../../template.yaml');
  const tableDefinitions = getTableDefinitions(template);
  await createTables(tableDefinitions);
})();
