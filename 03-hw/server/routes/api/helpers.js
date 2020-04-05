const { statuses, truckTypeInfo } = require('../../globals');
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

module.exports.handleLoadsPagination = (loads, _metadata, params) => {
  let paginatedLoads = [...loads];

  if (params) {
    const { page, rpp } = params;
    if (page && rpp) {
      _metadata.page = +page;
      _metadata.rpp = +rpp;
    }
  }

  paginatedLoads = loads.filter((_, i) => {
    const offset = (_metadata.page - 1) * _metadata.rpp;
    return offset <= i && i < offset + _metadata.rpp;
  });

  return paginatedLoads;
};

// statuses: [ new | posted | assigned | shipper ]
module.exports.handleLoadsStatusFiltering = (loads, _metadata, params) => {
  let filteredLoads = [...loads];

  if (params) {
    const { status } = params;
    if (status) {
      _metadata.status = statuses.load[status.toLowerCase()];
      filteredLoads = loads.filter(load => load.status === _metadata.status);

      _metadata.totalCount = filteredLoads.length;
    }
  }

  return filteredLoads;
};
