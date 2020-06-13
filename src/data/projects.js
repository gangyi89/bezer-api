// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;
const isLocal = process.env.AWS_SAM_LOCAL;

// Create a DocumentClient that represents the query to add an item
var AWS = require("aws-sdk");
const dynamodb = require("aws-sdk/clients/dynamodb");

if (isLocal) {
  AWS.config.update({
    endpoint: "http://docker.for.mac.localhost:8000",
  });
}
const docClient = new dynamodb.DocumentClient();

exports.add = async (data) => {
  var params = { TableName: tableName, Item: data };
  console.info(params);
  const result = await docClient.put(params).promise();

  return result;
};

exports.getAll = async () => {
  var params = { TableName: tableName };
  const data = await docClient.scan(params).promise();
  return data;
};

exports.getById = async (id) => {
  var params = { TableName: tableName, Key: { id: id } };
  const data = await docClient.get(params).promise();
  return data;
};

exports.getByUserId = async (userId) => {
  var params = {
    TableName: tableName,
    IndexName: "userIdIndex",
    KeyConditionExpression: "userId = :v_userId",
    ExpressionAttributeValues: { ":v_userId": userId },
  };
  data = await docClient.query(params).promise();

  console.info(`table is ${tableName}`);
  console.info(data);
  return data;
};
