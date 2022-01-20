//  TESTING CODE
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
// fetchMyIP((err, ip) => fetchCoordsByIP(ip, (err, data) => {
//   console.log(err, data);
// }));