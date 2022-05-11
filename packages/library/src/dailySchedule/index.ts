type JobCallback = () => void;

const ONE_DAY_IN_MILLI_SEC = 24 * 60 * 60 * 1000;

export default function dailySchedule(timePattern: string, cb: JobCallback) {
	validateTimePattern(timePattern);
	const curDate = new Date();
	const [hh, mm, ss] = timePattern.split(':').map(Number);
	const [curHour, curMinute, curSecond] = [
		curDate.getHours(),
		curDate.getMinutes(),
		curDate.getSeconds()
	];

	const timeDiff =
		new Date(0, 0, 0, hh, mm, ss).getTime() -
		new Date(0, 0, 0, curHour, curMinute, curSecond).getTime();

	if (timeDiff < 0) scheduleJob(cb, timeDiff + ONE_DAY_IN_MILLI_SEC);
	else scheduleJob(cb, timeDiff);
}

function validateTimePattern(timePattern: string) {
	if (timePattern.trim() === '') throw new Error('Invalid time pattern');
	if (timePattern.match(/[^\d:]/g)) throw new Error('Invalid time pattern');
	if (!timePattern.match(/^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]$/))
		throw new Error('Invalid time pattern');
}

function scheduleJob(cb: JobCallback, initialScheduleTime: number) {
	setTimeout(() => {
		cb();
		setInterval(cb, ONE_DAY_IN_MILLI_SEC);
	}, initialScheduleTime);
}
