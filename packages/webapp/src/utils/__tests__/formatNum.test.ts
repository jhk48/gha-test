import formatNum from '../formatNumber';

describe('format num util function', () => {
	test('Should format a string type integer', () => {
		expect(formatNum('')).toBe('0');
		expect(formatNum('1234')).toBe('1,234');
	});

	test('Should format an integer', () => {
		expect(formatNum(1)).toBe('1');
		expect(formatNum(12)).toBe('12');
		expect(formatNum(123)).toBe('123');
		expect(formatNum(1234)).toBe('1,234');
		expect(formatNum(12345)).toBe('12,345');
		expect(formatNum(123456)).toBe('123,456');
		expect(formatNum(1234567)).toBe('1,234,567');
		expect(formatNum(123456789)).toBe('123,456,789');
		expect(formatNum(1123456789)).toBe('1,123,456,789');
	});

	test('Should format a real number', () => {
		expect(formatNum(0.123)).toBe('0.12');
		expect(formatNum(1234.567)).toBe('1,234.57');
	});
});
