const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request('http://ip-api.com/json/' + ip);
};

const fetchISSFlyOverTimes = function(body) {
  const geoData = JSON.parse(body);
  const lat = geoData.lat;
  const long = geoData.lon;

  const url = 'https://iss-pass.herokuapp.com/json/?lat=' + lat + '&lon=' + long;

  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(flyOver => JSON.parse(flyOver).response);
};

module.exports = { nextISSTimesForMyLocation };