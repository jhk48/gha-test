import checkIsMarketOpen from '../checkIsMarketOpen';

test('checkIsMarketOpen test', async () => {
	const result = await checkIsMarketOpen();
	expect(result).toBe(false);
});
