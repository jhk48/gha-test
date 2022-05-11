import isValidRealNumber from '../isValidRealNumber';

describe('isValidRealNumber test', () => {
	test('Should return true when the value is an empty string', () => {
		expect(isValidRealNumber('')).toBe(true);
	});

	test('Should return true when the value is an integer', () => {
		expect(isValidRealNumber('1')).toBe(true);
		expect(isValidRealNumber('12')).toBe(true);
		expect(isValidRealNumber('123')).toBe(true);
	});

	test('Should return true when the value is a real number', () => {
		expect(isValidRealNumber('1.')).toBe(true);
		expect(isValidRealNumber('1.0')).toBe(true);
		expect(isValidRealNumber('1.01')).toBe(true);
		expect(isValidRealNumber('.1')).toBe(true);
		expect(isValidRealNumber('.12')).toBe(true);
	});

	test('Should return false when trying to input more than one decimal point', () => {
		expect(isValidRealNumber('1.01')).toBe(true);
		expect(isValidRealNumber('1.01.')).toBe(false);
		expect(isValidRealNumber('1.01.2')).toBe(false);
		expect(isValidRealNumber('12..')).toBe(false);
	});

	test('Should return false when trying to input other than number or decimal point', () => {
		expect(isValidRealNumber('a')).toBe(false);
		expect(isValidRealNumber('b')).toBe(false);
		expect(isValidRealNumber('!')).toBe(false);
		expect(isValidRealNumber('@')).toBe(false);
		expect(isValidRealNumber('>')).toBe(false);
		expect(isValidRealNumber('|')).toBe(false);
		expect(isValidRealNumber('e')).toBe(false);
		expect(isValidRealNumber('12e')).toBe(false);
		expect(isValidRealNumber('12(')).toBe(false);
		expect(isValidRealNumber('12+')).toBe(false);
		expect(isValidRealNumber('12.e')).toBe(false);
		expect(isValidRealNumber('.k')).toBe(false);
		expect(isValidRealNumber('.')).toBe(true);
	});
});
