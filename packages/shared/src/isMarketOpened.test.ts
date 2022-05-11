/* eslint-disable no-unneeded-ternary */
import isMarketOpened from './isMarketOpened';

describe('format date util function', () => {
	test('During the market', () => {
		expect(isMarketOpened(new Date(2022, 3, 1, 0, 0, 0))).toBe(true);
	});

	test('before opening or after closing', () => {
		expect(isMarketOpened(new Date(2022, 3, 1, 22, 29, 59))).toBe(false);
		expect(isMarketOpened(new Date(2022, 3, 1, 6, 0, 0))).toBe(false);
	});

	test(`When it's weekend`, () => {
		// saturday
		expect(isMarketOpened(new Date(2022, 3, 2, 22, 30, 8))).toBe(false);
		// sunday
		expect(isMarketOpened(new Date(2022, 3, 3, 22, 30, 8))).toBe(false);
	});

	test('When DST is considered', () => {
		const testDate = new Date(2022, 3, 1, 13).toLocaleDateString('en-US', {
			timeZone: 'America/New_York'
		});

		const isInDST = testDate === '4/1/2022';

		expect(isMarketOpened(new Date(2022, 3, 1, 22, 30, 0))).toBe(isInDST ? true : false);
		expect(isMarketOpened(new Date(2022, 3, 1, 23, 29, 59))).toBe(isInDST ? true : false);
		expect(isMarketOpened(new Date(2022, 3, 1, 4, 59, 59))).toBe(true);
		expect(isMarketOpened(new Date(2022, 3, 1, 5, 0, 0))).toBe(isInDST ? false : true);
	});
});
