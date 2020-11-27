const calcalueDiffBetweenTwoDates = (start, end = new Date()) => {
	var CalcTime = end - start; // Current - Initiallized

  var Years = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
  if (Years>0) return `${Years} years`
  CalcTime -= Years * (1000 * 60 * 60 * 24 * 7 * 4 * 12);
  var Months = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4);
  if (Months>0) return `${Months} months`
  CalcTime -= Months * (1000 * 60 * 60 * 24 * 7 * 4);
  var Weeks = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7);
  if (Weeks>0) return `${Weeks} weeks`
  CalcTime -= Weeks * (1000 * 60 * 60 * 24 * 7);
  // The calculation seconds to days works properly & The calculation of weeks to years may be off slightly
  var Days = Math.floor(CalcTime / 1000 / 60 / 60 / 24);
  if (Days>0) return `${Days} days`
  CalcTime -= Days * (1000 * 60 * 60 * 24);
	var Hours = Math.floor(CalcTime / 1000 / 60 / 60);
  if (Hours>0) return `${Hours} hours`
	CalcTime -= Hours * (1000 * 60 * 60);
	var Minutes = Math.floor(CalcTime / 1000 / 60);
  if (Minutes>0) return `${Minutes} minutes`
	CalcTime -= Minutes * (1000 * 60);
  var Seconds = Math.floor(CalcTime / 1000 / 60);
  if (Seconds>0) return `${Seconds} seconds`
}

export default calcalueDiffBetweenTwoDates;
