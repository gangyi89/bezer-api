const helpers = require("../../helpers");
const projectRepository = require("../../repositories/projectRepository");
const tableName = process.env.SAMPLE_TABLE;

exports.deleteProjectHandler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    throw new Error(
      `only accept DELETE method, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  const decoded = helpers.getUserDetail(event.headers.Authorization);
  const userId = decoded.payload.sub;
  const id = event.pathParameters.id;

  const result = await projectRepository.delete(id, userId);

  const response = {
    statusCode: 200,
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
