const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(times => times.forEach(time => printTimeForHumans(time)))
  .catch(error => console.log("It didn't work: ", error));

const printTimeForHumans = time => {
  const date = new Date(0);
  date.setUTCSeconds(time.risetime);
  const duration = time.duration;
  console.log(`Next pass at ${date} for ${duration} seconds!`);

  console.log(`Or ${Math.round((time.duration / 60) * 100) / 100} minutes`);
};