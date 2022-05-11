import sortByDate from '../sortByDate';

describe('sortByDate function test', () => {
	test('Should return 0 if input is wrong', () => {
		expect(sortByDate('a', new Date())).toBe(0);
		expect(sortByDate(new Date(), 'b')).toBe(0);
		expect(sortByDate('a', 'b')).toBe(0);
		expect(sortByDate('2022-03-14T05:00:14.469Z', 'b')).toBe(0);
	});

	test('Should return negative number', () => {
		expect(sortByDate('2022-03-14T00:00:00.000Z', '2022-03-14T00:00:00.001Z')).toBeLessThan(0);
		expect(sortByDate('2022-03-14T00:00:00.000Z', '2022-03-15T00:00:00.000Z')).toBeLessThan(0);
		expect(sortByDate('2022-03-14T00:00:00.000Z', '2022-04-14T00:00:00.000Z')).toBeLessThan(0);
		expect(sortByDate('2022-03-14T00:00:00.000Z', '2023-03-14T00:00:00.000Z')).toBeLessThan(0);
		expect(sortByDate('2022-03-14T00:00:00.000Z', new Date())).toBeLessThan(0);
	});

	test('Should return 0', () => {
		expect(sortByDate('2022-03-14T00:00:00.000Z', '2022-03-14T00:00:00.000Z')).toBe(0);
		expect(sortByDate(new Date(), new Date())).toBe(0);
	});

	test('Should return positive number', () => {
		expect(
			sortByDate('2022-03-14T00:00:00.000Z', '2022-03-14T00:00:00.001Z', 'desc')
		).toBeGreaterThan(0);
		expect(
			sortByDate('2022-03-14T00:00:00.000Z', '2022-03-15T00:00:00.000Z', 'desc')
		).toBeGreaterThan(0);
		expect(
			sortByDate('2022-03-14T00:00:00.000Z', '2022-04-14T00:00:00.000Z', 'desc')
		).toBeGreaterThan(0);
		expect(
			sortByDate('2022-03-14T00:00:00.000Z', '2023-03-14T00:00:00.000Z', 'desc')
		).toBeGreaterThan(0);
	});
});
