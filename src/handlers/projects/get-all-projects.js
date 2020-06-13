const helpers = require("../../helpers");
const dataAccess = require("../../data/projects");
const tableName = process.env.SAMPLE_TABLE;

exports.getAllProjectsHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(`only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info("received:", event);
  console.info(`table is ${tableName}`);

  const body = JSON.parse(event.body);
  const decoded = helpers.getUserDetail(event.headers.Authorization);
  const userId = decoded.payload.sub;
  const date = new Date().toISOString();

  const data = await dataAccess.getByUserId(userId);
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
