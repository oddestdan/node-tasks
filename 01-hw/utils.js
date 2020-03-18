const checkEmptyObject = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

module.exports.parseUrlParams = url => {
  const parameters = {};
  const urlRegexp = /[?&]+([^=&]+)=([^&]*)/gi;

  url.replace(urlRegexp, function(_, key, value) {
    parameters[key] = value;
  });

  return checkEmptyObject(parameters) ? null : parameters;
};

module.exports.prettyStringify = data => JSON.stringify(data, null, 2);
