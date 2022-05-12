import formatCurrency from '../formatCurrency';

describe('format currency util function', () => {
	test('Should format number in usd', () => {
		expect(formatCurrency('', 'usd')).toBe('$0.00');
		expect(formatCurrency('123', 'usd')).toBe('$123.00');
		expect(formatCurrency('1234', 'usd')).toBe('$1,234.00');
		expect(formatCurrency(123456, 'usd')).toBe('$123,456.00');
		expect(formatCurrency(12345678.12, 'usd')).toBe('$12,345,678.12');
	});

	test('Should format number in krw', () => {
		expect(formatCurrency('', 'krw')).toBe('₩0');
		expect(formatCurrency('123', 'krw')).toBe('₩123');
		expect(formatCurrency('1234', 'krw')).toBe('₩1,234');
		expect(formatCurrency(123456, 'krw')).toBe('₩123,456');
		expect(formatCurrency(12345678.12, 'krw')).toBe('₩12,345,678.12');
	});
});
