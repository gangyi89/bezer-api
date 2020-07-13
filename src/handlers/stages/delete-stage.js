const helpers = require("../../helpers");
const stageRepository = require("../../repositories/stageRepository");
const tableName = process.env.SAMPLE_TABLE;

exports.deleteStageHandler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    throw new Error(
      `only accept DELETE method, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  const decoded = helpers.getUserDetail(event.headers.Authorization);
  const userId = decoded.payload.sub;
  const id = event.pathParameters.id;

  const result = await stageRepository.delete(id, userId);

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    statusCode: 200,
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
