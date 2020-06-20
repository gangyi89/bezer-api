const helpers = require("../../helpers");
const projectRepository = require("../../repositories/projectRepository");
const userRepository = require("../../repositories/userRepository");
const tableName = process.env.SAMPLE_TABLE;

exports.joinSessionHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(`only accept POST method, you tried: ${event.httpMethod}`);
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  const accessCode = body.accessCode;

  if (body.accessCode === undefined) {
    const errorResponse = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      statusCode: 400,
      body: JSON.stringify({ message: "missing accessCode parameter" }),
    };
    return errorResponse;
  }

  //check if accessCode exist
  const data = await projectRepository.getByAccessCode(accessCode);
  if (data.Count === 0) {
    const errorResponse = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
      statusCode: 404,
      body: JSON.stringify({ message: "access code is invalid" }),
    };
    return errorResponse;
  }

  const projectId = data.Items[0].id;
  const id = helpers.CreateGuid();

  //store in dynamodb
  const store = {
    id: id,
    accessCode: accessCode,
    date: new Date().toISOString(),
    projectId: projectId,
  };

  const result = await userRepository.add(store);

  console.info(result);

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    statusCode: 200,
    body: JSON.stringify(store),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode}`
  );
  return response;
};
