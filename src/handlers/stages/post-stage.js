const helpers = require("../../helpers");
const stageRepository = require("../../repositories/stageRepository");
const httpResponse = require("../../helpers/httpResponse");
const DomainException = require("../../helpers/DomainException");

exports.postStageHandler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(
        `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
      );
    }
    console.info("received:", event);

    const decoded = helpers.getUserDetail(event.headers.Authorization);
    const userId = decoded.payload.sub;

    const body = JSON.parse(event.body);
    const { projectId, name, description, level, id } = body;

    if (name === undefined || projectId === undefined || level === undefined) {
      throw new DomainException("missing a parameter");
    }

    const data = {
      id: id || helpers.CreateGuid(),
      userId: userId,
      name: name,
      projectId: projectId,
      description: description,
      level: level,
    };

    console.info(data);

    const result = await stageRepository.add(data);

    return httpResponse("200", data);
  } catch (e) {
    if (e.name === "DomainException") {
      return httpResponse(e.statusCode, e.message);
    } else {
      return httpResponse("500", "internal server error");
    }
  }
};
