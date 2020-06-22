const profileServices = require("../../services/profileServices");
const httpResponse = require("../../helpers/httpResponse");

exports.postProfileHandler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(
        `only accept POST method, you tried: ${event.httpMethod}`
      );
    }
    console.info("received:", event);

    const body = JSON.parse(event.body);
    const { id, accessCode } = body;

    if (id === undefined || accessCode === undefined) {
      throw new Error("missing a parameter");
    }

    await profileServices.createProfile({ id, accessCode });
    return httpResponse("200");
  } catch (e) {
    if (e.name === "DomainException") {
      return httpResponse(e.statusCode, e.message);
    } else {
      return httpResponse("500", "internal server error");
    }
  }
};
