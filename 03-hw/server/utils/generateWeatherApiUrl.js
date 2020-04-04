const url = require('url');
const config = require('config');
const { baseUrl, APIkey, query } = config.get('weather');

const generateWeatherApiUrl = (locationConfigType, locationConfigData) => {
  const requestQuery = { appid: APIkey };

  if (locationConfigType !== 'coordinates') {
    requestQuery[query[locationConfigType]] = locationConfigData;
  } else {
    if (locationConfigData.latitude) {
      requestQuery[query.coordinates.latitude] = locationConfigData.latitude;
    }

    if (locationConfigData.longitude) {
      requestQuery[query.coordinates.longitude] = locationConfigData.longitude;
    }
  }
  requestQuery.units = 'metric';

  const formatted = url.format({
    protocol: baseUrl.protocol,
    hostname: baseUrl.hostname,
    pathname: baseUrl.path,
    query: requestQuery,
  });
  console.log(formatted);
  return formatted;
};

module.exports = generateWeatherApiUrl;
