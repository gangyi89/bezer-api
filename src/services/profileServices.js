const helpers = require("../helpers");
const profileRepository = require("../repositories/profileRepository");
const demographicServices = require("./demographicServices");

const DomainException = require("../helpers/DomainException");

exports.createProfile = async ({ id, accessCode }) => {
  //check in profile db if user exist
  const data = await profileRepository.getById(id);

  if (data.Item !== undefined) {
    throw new DomainException("profile already exist");
  }

  //generate demographics
  const selected = await demographicServices.getDemographic(accessCode);

  const result = await profileRepository.add({ id, selected });
};

exports.updateProfile = async (data) => {
  const result = await profileRepository.add(data);
};
