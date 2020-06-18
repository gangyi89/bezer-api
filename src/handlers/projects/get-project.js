const helpers = require("../../helpers");
const projectRepository = require("../../repositories/projectRepository");
const tableName = process.env.SAMPLE_TABLE;

exports.getProjectHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(`only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info("received:", event);

  const decoded = helpers.getUserDetail(event.headers.Authorization);
  const userId = decoded.payload.sub;
  const id = event.pathParameters.id;

  const data = await projectRepository.getById(id, userId);
  const item = data.Item;

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    statusCode: 200,
    body: JSON.stringify(item),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
