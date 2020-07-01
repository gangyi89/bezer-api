const helpers = require("../../helpers");
const stageRepository = require("../../repositories/stageRepository");
const httpResponse = require("../../helpers/httpResponse");
const DomainException = require("../../helpers/DomainException");

exports.getAllStagesHandler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(
        `postMethod only accepts GET method, you tried: ${event.httpMethod} method.`
      );
    }
    console.info("received:", event);

    const projectId = event.queryStringParameters.projectId;

    if (projectId === undefined) {
      throw new DomainException("missing a parameter");
    }

    const data = await stageRepository.getByProjectId(projectId);

    return httpResponse("200", data.Items);
    // const response = {
    //   statusCode: 200,
    //   body: JSON.stringify(data.Items),
    // };
    // return response;
  } catch (e) {
    if (e.name === "DomainException") {
      return httpResponse(e.statusCode, e.message);
    } else {
      return httpResponse("500", "internal server error");
    }
  }
};
