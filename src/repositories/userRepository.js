// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS_TABLE;
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
