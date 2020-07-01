const profileServices = require("../../services/profileServices");
const httpResponse = require("../../helpers/httpResponse");
const DomainException = require("../../helpers/DomainException");

exports.postProfileHandler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(
        `only accept POST method, you tried: ${event.httpMethod}`
      );
    }
    console.info("received:", event);

    const body = JSON.parse(event.body);
    const { id, projectId, selected } = body;

    if (id === undefined || projectId === undefined) {
      throw new DomainException("missing a parameter");
    }

    //if selected already populated, just treat as update
    if (selected !== undefined) {
      await profileServices.updateProfile({ ...body });
      return httpResponse("200");
    }
    //else create profile by generating the user role
    await profileServices.createProfile({ id, projectId });
    return httpResponse("200");
  } catch (e) {
    if (e.name === "DomainException") {
      return httpResponse(e.statusCode, e.message);
    } else {
      return httpResponse("500", "internal server error");
    }
  }
};
