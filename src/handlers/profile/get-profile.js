const profileRepository = require("../../repositories/profileRepository");
const httpResponse = require("../../helpers/httpResponse");
const DomainException = require("../../helpers/DomainException");

exports.getProfileHandler = async (event) => {
  try {
    if (event.httpMethod !== "GET") {
      throw new Error(`only accept GET method, you tried: ${event.httpMethod}`);
    }
    console.info("received:", event);

    const id = event.pathParameters.id;

    const data = await profileRepository.getById(id);
    const item = data.Item;
    if (item === undefined) {
      throw new DomainException("id not found", 404);
    }
    return httpResponse("200", item);
  } catch (e) {
    if (e.name === "DomainException") {
      return httpResponse(e.statusCode, e.message);
    } else {
      return httpResponse("500", "internal server error");
    }
  }
};
