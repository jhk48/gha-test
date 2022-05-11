import {
	fakeTickers,
	fakeGetSectorsResultCase1,
	fakeGetSectorsResultCase2,
	fakeGetSectorsResultCase3
} from '@lib/msw/mockData/stock';
import getSectors from '../getSectors';

test('getSectors test case1: search=AAPL', async () => {
	const result = await getSectors(['AAPL']);
	expect(result).toStrictEqual(fakeGetSectorsResultCase1);
});

test('getSectors case2: search=TSLA', async () => {
	const result = await getSectors(['TSLA']);
	expect(result).toStrictEqual(fakeGetSectorsResultCase2);
});

test(`getSectors case3: search=["AAPL", "TSLA"]`, async () => {
	const result = await getSectors(fakeTickers);
	expect(result).toStrictEqual(fakeGetSectorsResultCase3);
});

test(`getSectors test case4: search=['']`, async () => {
	const result = await getSectors(['']);
	expect(result).toStrictEqual([]);
});
