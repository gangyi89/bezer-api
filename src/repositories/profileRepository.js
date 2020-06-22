// Get the DynamoDB table name from environment variables
const tableName = process.env.PROFILES_TABLE;
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
  const result = await docClient.put(params).promise();

  return result;
};

exports.getById = async (id) => {
  var params = {
    TableName: tableName,
    Key: {
      id: id,
    },
  };
  const data = await docClient.get(params).promise();
  return data;
};

exports.delete = async (id, userId) => {
  var params = {
    TableName: tableName,
    Key: {
      id: id,
    },
  };

  const result = await docClient.delete(params).promise();

  return result;
};
