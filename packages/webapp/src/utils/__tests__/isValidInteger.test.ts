import isValidInteger from '../isValidInteger';

describe('isValidInteger test', () => {
	test('Should return true when the value is an empty string', () => {
		expect(isValidInteger('')).toBe(true);
	});

	test('Should return true when the value is an integer', () => {
		expect(isValidInteger('1')).toBe(true);
		expect(isValidInteger('12')).toBe(true);
		expect(isValidInteger('123')).toBe(true);
	});

	test('Should return false when the value is a real number', () => {
		expect(isValidInteger('1.')).toBe(false);
		expect(isValidInteger('1.0')).toBe(false);
		expect(isValidInteger('1.01')).toBe(false);
		expect(isValidInteger('.1')).toBe(false);
		expect(isValidInteger('.12')).toBe(false);
	});

	test('Should return false when trying to input other than number', () => {
		expect(isValidInteger('a')).toBe(false);
		expect(isValidInteger('b')).toBe(false);
		expect(isValidInteger('!')).toBe(false);
		expect(isValidInteger('@')).toBe(false);
		expect(isValidInteger('>')).toBe(false);
		expect(isValidInteger('|')).toBe(false);
		expect(isValidInteger('e')).toBe(false);
		expect(isValidInteger('12e')).toBe(false);
		expect(isValidInteger('12(')).toBe(false);
		expect(isValidInteger('12+')).toBe(false);
		expect(isValidInteger('12.e')).toBe(false);
		expect(isValidInteger('.k')).toBe(false);
		expect(isValidInteger('.')).toBe(false);
	});
});
