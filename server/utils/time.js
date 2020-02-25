/**
 * @description Makes sure that a positive amount of time elapses between d1 and d2
 * @param {int32} d1 Unix UTC timestamp
 * @param {int32} d2 Unix UTC timestamp
 * @returns {boolean} true if d1 happens before d2
 */
const entranceIsBeforeExit = (d1, d2) => d1 <= d2;

/**
 * @description Calculate and return whole minutes between two timestamps
 * @param {int32} date1 Unix UTC timestamp from Date().getTime()
 * @param {int32} date2 Unix UTC timestamp from Date().getTime()
 * @returns {int32} Minutes elapsed
 */
const minutesBetween = (date1, date2) =>
  Math.floor((date2 - date1) / 1000 / 60);

/**
 * @description Converts minutes to whole hours. e.g. 60-119 minutes returns 1
 * @param {int32} minutes Minutes to convert
 * @returns {int32} Hours calculation truncated to a whole number
 */
const fullHours = minutes => {
  return Math.floor(minutes / 60);
};

/**
 * @description Returns parking charge based on in and out times
 * @param {int32} d1 Unix UTC timestamp
 * @param {int32} d2 Unix UTC timestamp
 * @returns {int32} Parking charge
 */
const rate = (d1, d2) => {
  const $for1HOUR = 3;
  const $for3HOUR = 4.5;
  const $for6HOUR = 6;
  const $forALL_DAY = 7.5;
  const hours = fullHours(minutesBetween(d1, d2));

  switch (true) {
    case hours === 0:
      return $for1HOUR;
    case hours <= 3:
      return $for3HOUR;
    case hours <= 6:
      return $for6HOUR;
    default:
      return $forALL_DAY;
  }
};

module.exports = {
  entranceIsBeforeExit,
  minutesBetween,
  fullHours,
  rate
};
