export default function datetimeLocalFormat(dateInput: string | undefined = undefined) {
	try {
		const date = typeof dateInput === 'string' ? new Date(dateInput) : new Date();
		return formatHelper(date);
	} catch (error) {
		const date = new Date();
		return formatHelper(date);
	}
}

function formatHelper(date: Date) {
	const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
	const [ymdInfo, time] = date.toLocaleString('en-US', { hour12: false, timeZone }).split(', ');
	const [month, day, year] = ymdInfo.split('/');

	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
}
