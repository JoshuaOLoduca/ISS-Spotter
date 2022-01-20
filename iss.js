const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    
    const ip = data.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://ip-api.com/json/' + ip, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    
    const longLat = {
      latitude: data.lat,
      longitude: data.lon
    };

    if (longLat.latitude === undefined) {
      callback(Error('IP not found'), null);
      return;
    }

    callback(null, longLat);
  });

};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = coords.latitude;
  const long = coords.longitude;

  const url = 'https://iss-pass.herokuapp.com/json/?lat=' + lat + '&lon=' + long;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching locations for fly overs. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOvers = JSON.parse(body).response;

    callback(null, flyOvers);

  });

};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };