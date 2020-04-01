const { statuses, truckTypeInfo, loadStates } = require('../../globals');
const { Truck } = require('../../models');

module.exports.checkUserIsOnLoad = async assigneeId => {
  const userAssignedTruck = await Truck.findOne({ assigneeId });
  return (
    userAssignedTruck && userAssignedTruck.status === statuses.truck['onLoad']
  );
};

module.exports.findTruckCandidate = (trucks, load) => {
  const compareDimensions = (dimA, dimB) => {
    return (
      dimA['width'] >= dimB['width'] &&
      dimA['length'] >= dimB['length'] &&
      dimA['height'] >= dimB['height']
    );
  };
  const comparePayloads = (payA, payB) => payA >= payB;

  // Find Truck that fits with load dimensions and payload
  const truckCandidate = trucks.find(truck => {
    const { dimensions, payload } = truckTypeInfo[truck.type];

    const fitsDims = compareDimensions(dimensions, load.dimensions);
    const fitsPayloads = comparePayloads(payload, load.payload);
    const isStatus = truck.status === statuses.truck['inService'];
    const isAssigned = truck.assigneeId ? true : false;

    return fitsDims && fitsPayloads && isStatus && isAssigned;
  });

  return truckCandidate;
};
