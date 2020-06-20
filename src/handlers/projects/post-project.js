const helpers = require("../../helpers");
const projectRepository = require("../../repositories/projectRepository");

exports.postProjectHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  const decoded = helpers.getUserDetail(event.headers.Authorization);
  const userId = decoded.payload.sub;
  const name = body.name;

  if (name === undefined) {
    const errorResponse = {
      statusCode: 401,
      body: JSON.stringify({ message: "missing name parameter" }),
    };
    return errorResponse;
  }

  const date = new Date().toISOString();
  const key = name.replace(/\s+/g, "");

  const data = {
    id: key,
    userId: userId,
    name: name,
    date: date,
    accessCode: helpers.CreateAccessCode().toString(),
  };

  console.info(data);

  const result = await projectRepository.add(data);

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    statusCode: 200,
    body: JSON.stringify(data),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
