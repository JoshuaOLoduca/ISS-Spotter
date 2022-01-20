const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
  for (let time of passTimes) {
    printTimeForHumans(time);
  }
});

const printTimeForHumans = time => {
  const date = new Date(time.risetime * 1000);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(date);
  console.log(`Next pass at ${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT-0400 (Eastern Standard Time) for ${time.duration} seconds!`);
  console.log(`Or ${Math.round((time.duration / 60) * 100) / 100} minutes`);

  // More concise way
  // datetime.setUTCSeconds(pass.risetime);
  // const duration = pass.duration;
  // console.log(`Next pass at ${datetime} for ${duration} seconds!`);
};


//  TESTING CODE
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
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