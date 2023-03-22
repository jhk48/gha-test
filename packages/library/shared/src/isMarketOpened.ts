export default function isMarketOpened(date: Date) {
	const curTimeInUTC = new Date(date.getTime() + new Date().getTimezoneOffset() * 60 * 1000);
	if (isWeekend(curTimeInUTC)) return false;

	const hour = curTimeInUTC.getHours();
	const minute = curTimeInUTC.getMinutes();
	if (isDaylightTimeApplied()) {
		if (hour < 13) return false;
		if (hour === 13 && minute < 30) return false;
		if (hour >= 20) return false;
	} else {
		if (hour < 14) return false;
		if (hour === 14 && minute < 30) return false;
		if (hour >= 21) return false;
	}

	return true;
}

function isWeekend(date: Date) {
	const dateInfo = date.getDay();
	return dateInfo === 6 || dateInfo === 0;
}

function isDaylightTimeApplied() {
	const testDate = new Date(2022, 3, 1, 13).toLocaleDateString('en-US', {
		timeZone: 'America/New_York'
	});

	return testDate === '4/1/2022';
}
