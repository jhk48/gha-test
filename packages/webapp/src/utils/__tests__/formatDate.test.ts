import formatDate from '../formatDate';

describe('format date util function', () => {
	test('Should format string input', () => {
		expect(formatDate('')).toBe('1970. 1. 1.');
		expect(formatDate('02/21/2021')).toBe('2021. 2. 21.');
		expect(formatDate('11/11/2021')).toBe('2021. 11. 11.');
		expect(formatDate('2021/01/01')).toBe('2021. 1. 1.');
		expect(formatDate('2021/13/34')).toBe('1970. 1. 1.');
		expect(formatDate('9999/9/9')).toBe('9999. 9. 9.');
	});

	test('Should format number input', () => {
		expect(formatDate(-1)).toBe('1970. 1. 1.');
		expect(formatDate(0)).toBe('1970. 1. 1.');
		expect(formatDate(1646903904626)).toBe('2022. 3. 10.');
	});
});
