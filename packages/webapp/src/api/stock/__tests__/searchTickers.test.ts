import { fakeSearchTickerResultCase1, fakeSearchTickerResultCase2 } from '@lib/msw/mockData/stock';
import searchTickers from '../searchTickers';

test('searchTickers test case1: search=AAPL', async () => {
	const result = await searchTickers('AAPL');
	expect(result).toStrictEqual(fakeSearchTickerResultCase1);
});

test('searchTickers test case2: search=TSLA', async () => {
	const result = await searchTickers('TSLA');
	expect(result).toStrictEqual(fakeSearchTickerResultCase2);
});

test('searchTickers test case3: search=invalid', async () => {
	const result = await searchTickers('invalid');
	expect(result).toStrictEqual([]);
});
