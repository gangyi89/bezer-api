const demographicRepository = require("../repositories/demographicRepository");

const newRatio = {
  elder: 3,
  adult: 4,
  youngAdult: 2,
  student: 1,
};
exports.getDemographic = async (accessCode) => {
  //check if accessCode exist
  const data = await demographicRepository.getById(accessCode);

  if (data.Count !== undefined) {
    //working with existing demographics
    const { id, ...currentRatio } = data.Item;
    const { selected, updatedRatio } = demographicSelector(currentRatio);
    const store = { id: accessCode, ...updatedRatio };
    const result = await demographicRepository.update(store);
    return selected;
  }

  //create new ratio
  const { selected, updatedRatio } = demographicSelector(newRatio);
  const store = { id: accessCode, ...updatedRatio };
  const result = await demographicRepository.add(store);
  console.info(`accessCode ${accessCode} is assigned ${selected}`);
  return selected;
};

const demographicSelector = (ratio) => {
  var array = [];
  //check if all is zero
  var values = Object.values(ratio);

  var valueSum = 0;

  values.forEach((value) => {
    valueSum += value;
  });

  if (valueSum === 0) {
    //refresh the ratio
    ratio = newRatio;
  }

  Object.keys(ratio).map((dg) => {
    var i;
    for (i = 0; i < ratio[dg]; i++) {
      array.push(dg);
    }
  });
  const random = Math.floor(Math.random() * array.length);
  const selected = array[random];

  const updatedRatio = { ...ratio, [selected]: ratio[selected] - 1 };
  console.log(updatedRatio);
  return { selected, updatedRatio };
};
