import abbreviateNumber from '../abbreviateNumber';

describe('Not provide currency arg', () => {
	test('Less than one million', () => {
		expect(abbreviateNumber(0)).toBe('0');
		expect(abbreviateNumber(1.0)).toBe('1');
		expect(abbreviateNumber(1.23)).toBe('1.23');
		expect(abbreviateNumber(123)).toBe('123');
		expect(abbreviateNumber(1234)).toBe('1,234');
		expect(abbreviateNumber(12345)).toBe('12,345');
		expect(abbreviateNumber(123456)).toBe('123,456');
	});

	test('Less than one billion', () => {
		expect(abbreviateNumber(1000000)).toBe('1.00M');
		expect(abbreviateNumber(1234567)).toBe('1.23M');
		expect(abbreviateNumber(12345678)).toBe('12.35M');
		expect(abbreviateNumber(123456789)).toBe('123.46M');
	});

	test('Less than one trillion', () => {
		expect(abbreviateNumber(1000000000)).toBe('1.00B');
		expect(abbreviateNumber(1234567890)).toBe('1.23B');
		expect(abbreviateNumber(12345678901)).toBe('12.35B');
		expect(abbreviateNumber(123456789012)).toBe('123.46B');
	});

	test('Greater than or equal to one trillion', () => {
		expect(abbreviateNumber(1000000000000)).toBe('1.00T');
		expect(abbreviateNumber(1234567890123)).toBe('1.23T');
		expect(abbreviateNumber(12345678901234)).toBe('12.35T');
		expect(abbreviateNumber(123456789012345)).toBe('123.46T');
		expect(abbreviateNumber(1234567890123456)).toBe('1,234.57T');
	});
});

describe(`provide 'usd' arg`, () => {
	test('Less than one million', () => {
		expect(abbreviateNumber(0, 'usd')).toBe('$0.00');
		expect(abbreviateNumber(1, 'usd')).toBe('$1.00');
		expect(abbreviateNumber(1.23, 'usd')).toBe('$1.23');
		expect(abbreviateNumber(1234.56, 'usd')).toBe('$1,234.56');
	});

	test('Less than one billion', () => {
		expect(abbreviateNumber(1000000, 'usd')).toBe('$1.00M');
		expect(abbreviateNumber(1234567, 'usd')).toBe('$1.23M');
		expect(abbreviateNumber(123456789, 'usd')).toBe('$123.46M');
	});

	test('Less than one trillion', () => {
		expect(abbreviateNumber(1000000000, 'usd')).toBe('$1.00B');
		expect(abbreviateNumber(1234567890, 'usd')).toBe('$1.23B');
		expect(abbreviateNumber(123456789012, 'usd')).toBe('$123.46B');
	});

	test('Greater than or equal to one trillion', () => {
		expect(abbreviateNumber(1000000000000, 'usd')).toBe('$1.00T');
		expect(abbreviateNumber(1234567890123, 'usd')).toBe('$1.23T');
		expect(abbreviateNumber(123456789012345, 'usd')).toBe('$123.46T');
		expect(abbreviateNumber(1234567890123456, 'usd')).toBe('$1,234.57T');
	});
});

describe(`provide 'krw' arg`, () => {
	test('Less than one million', () => {
		expect(abbreviateNumber(0, 'krw')).toBe('₩0');
		expect(abbreviateNumber(1, 'krw')).toBe('₩1');
		expect(abbreviateNumber(1.23, 'krw')).toBe('₩1');
		expect(abbreviateNumber(1234.56, 'krw')).toBe('₩1,235');
	});

	test('Less than one billion', () => {
		expect(abbreviateNumber(1000000, 'krw')).toBe('₩1.00백만');
		expect(abbreviateNumber(1234567, 'krw')).toBe('₩1.23백만');
		expect(abbreviateNumber(123456789, 'krw')).toBe('₩123.46백만');
	});

	test('Less than one trillion', () => {
		expect(abbreviateNumber(1000000000, 'krw')).toBe('₩1.00십억');
		expect(abbreviateNumber(1234567890, 'krw')).toBe('₩1.23십억');
		expect(abbreviateNumber(123456789012, 'krw')).toBe('₩123.46십억');
	});

	test('Greater than or equal to one trillion', () => {
		expect(abbreviateNumber(1000000000000, 'krw')).toBe('₩1.00조');
		expect(abbreviateNumber(1234567890123, 'krw')).toBe('₩1.23조');
		expect(abbreviateNumber(123456789012345, 'krw')).toBe('₩123.46조');
		expect(abbreviateNumber(1234567890123456, 'krw')).toBe('₩1,234.57조');
	});
});
