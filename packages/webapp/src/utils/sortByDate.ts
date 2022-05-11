export default function sortByDate(
	a: string | Date,
	b: string | Date,
	order: 'asc' | 'desc' = 'asc'
) {
	const date1 = typeof a === 'string' ? Date.parse(a) : a.getTime();
	const date2 = typeof b === 'string' ? Date.parse(b) : b.getTime();
	if (Number.isNaN(date1) || Number.isNaN(date2)) return 0;
	return order === 'asc' ? date1 - date2 : date2 - date1;
}
