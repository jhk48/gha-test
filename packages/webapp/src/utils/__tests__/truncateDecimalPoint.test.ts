import truncateDecimalPoint from '../truncateDecimalPoint';

describe('truncateDecimalPoint', () => {
	test('Should return truncated number as the limit says', () => {
		expect(truncateDecimalPoint(123.456, 0)).toBe(123);
		expect(truncateDecimalPoint(123.567, 0)).toBe(124);
		expect(truncateDecimalPoint(123.456, 1)).toBe(123.5);
		expect(truncateDecimalPoint(123.456, 2)).toBe(123.46);
		expect(truncateDecimalPoint(123.456, 3)).toBe(123.456);
		expect(truncateDecimalPoint(123.456, 4)).toBe(123.456);
		expect(truncateDecimalPoint('', 2)).toBe(0);
		expect(truncateDecimalPoint('123.456', 2)).toBe(123.46);
	});
});
