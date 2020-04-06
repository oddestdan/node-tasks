const checkEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const parseUrlParams = url => {
  const parameters = {};
  const urlRegexp = /[?&]+([^=&]+)=([^&]*)/gi;

  url.replace(urlRegexp, function(_, key, value) {
    parameters[key] = value;
  });

  return checkEmptyObject(parameters) ? null : parameters;
};

module.exports = parseUrlParams;
