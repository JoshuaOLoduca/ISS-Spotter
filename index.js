//  TESTING CODE
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// fetchMyIP((err, ip) => fetchCoordsByIP(ip, (err, data) => {

//   fetchISSFlyOverTimes(data, (err, locations) => {
//     console.log(locations);
//   });
// }));