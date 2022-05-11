export default function formatDate(dateInput: string | number) {
	const date = typeof dateInput === 'string' ? Date.parse(dateInput) : dateInput;
	if (Number.isNaN(date)) return '1970. 1. 1.';
	return Intl.DateTimeFormat('ko-KR').format(date);
}
