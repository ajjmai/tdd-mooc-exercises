
// "Code which reads the current time is inherently untestable."
// Time is a global variable that is constantly changing.

const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

export function daysUntilChristmasRefactored(fromDate) {
  const year = fromDate.getUTCFullYear();
  const christmasDay = new Date(Date.UTC(year, 11, 25));
  if (fromDate.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(year + 1);
  }
  const diffMillis = christmasDay.getTime() - fromDate.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
