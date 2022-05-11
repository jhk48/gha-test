export const holdings = [
	{
		ticker: 'AAPL',
		avgCost: 123.45,
		quantity: 123
	},
	{
		ticker: 'MSFT',
		avgCost: 123.45,
		quantity: 123
	}
];

export const portfolios = [
	{
		id: 1,
		userId: 1,
		name: '포트폴리오 1',
		privacy: 'public',
		createdAt: '2022-03-07T12:37:15.000Z'
	},
	{
		id: 2,
		userId: 2,
		name: '포트폴리오 2',
		privacy: 'private',
		createdAt: '2022-03-08T00:26:00.000Z'
	}
];

export const stockTransactionLogs = [
	{
		id: 1,
		portfolioId: 1,
		ticker: 'AAPL',
		price: 132.14,
		quantity: 1,
		memo: null,
		transactionType: 'buy',
		avgBuyCost: null,
		createdAt: '2022-03-24T04:54:39.000Z'
	},
	{
		id: 2,
		portfolioId: 1,
		ticker: 'AAPL',
		price: 123.45,
		quantity: 1,
		memo: 'abc',
		transactionType: 'sell',
		avgBuyCost: 94.0141891891892,
		createdAt: '2022-03-24T04:33:41.000Z'
	}
];

export const createPortfolioResult = {
	id: 1,
	userId: 1,
	name: 'test',
	privacy: 'public',
	createdAt: '2022-04-06T02:28:34.000Z'
};

export const editPortfolioNameResult = {
	id: 1,
	userId: 1,
	name: 'test',
	privacy: 'public',
	createdAt: '2022-03-18T04:33:14.000Z'
};

export const editPortfolioPrivacyResult = {
	id: 1,
	userId: 1,
	name: 'test',
	privacy: 'private',
	createdAt: '2022-03-18T04:33:16.000Z'
};
