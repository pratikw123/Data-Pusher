const axios = require('axios');
const qs = require('qs');

module.exports = async (destination, data) => {
  const { url, httpMethod, headers } = destination;
  const config = {
    method: httpMethod.toLowerCase(),
    url: url,
    headers: headers
  };

  if (httpMethod === 'GET') {
    config.params = data;
    config.paramsSerializer = params => {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    };
  } else {
    config.data = data;
  }

  return axios(config);
};
