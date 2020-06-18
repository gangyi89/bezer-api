const helpers = require("../../helpers");
const projectRepository = require("../../repositories/projectRepository");
const tableName = process.env.SAMPLE_TABLE;

exports.getAllProjectsHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(`only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  const decoded = helpers.getUserDetail(event.headers.Authorization);
  const userId = decoded.payload.sub;
  const date = new Date().toISOString();

  const data = await projectRepository.getByUserId(userId);
  const items = data.Items;

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    statusCode: 200,
    body: JSON.stringify(items),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
