const minutesBetween = (date1, date2) =>
  Math.floor((date2 - date1) / 1000 / 60);

const fullHours = minutes => {
  return Math.floor(minutes / 60);
};

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
  minutesBetween,
  fullHours,
  rate
};
