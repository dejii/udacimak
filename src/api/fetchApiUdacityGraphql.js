

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = fetchApiUdacityGraphql;

const _request = _interopRequireDefault(require('request'));

const _utils = require('../commands/utils');

const _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Send request to Udacity API
 * @param {string} url request url
 * @param {string} queryGraphql graphQl Query
 * @param {string} udacityAuthToken Udacity authentication token
 */
function fetchApiUdacityGraphql(url, queryGraphql, udacityAuthToken = '') {
  if (!udacityAuthToken) {
    udacityAuthToken = _utils.config.get(_config.CLI_CONFIG_UDACITY_AUTH_TOKEN);
  }

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${udacityAuthToken}`,
    'Content-Type': 'application/json; charset=UTF-8',
    Host: 'classroom-content.udacity.com',
    Origin: 'https://classroom.udacity.com',
    Referer: 'https://classroom.udacity.com/me',
    // https://github.com/request/request/issues/2047#issuecomment-272473278
    // avoid socket hang up error
    Connection: 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
  };
  const method = 'POST';
  const requestOptions = {
    url,
    body: queryGraphql,
    method,
    headers,
    // avoid socket hang up error
    forever: true,
  };
  return new Promise((resolve, reject) => {
    (0, _request.default)(requestOptions, (error, res) => {
      if (error) {
        reject(new Error(error));
      } else {
        const jsonRes = JSON.parse(res.body);

        if (jsonRes.errors) {
          reject(jsonRes.errors);
        } else {
          resolve(jsonRes);
        }
      }
    });
  });
}
