const { workerData, parentPort } = require('worker_threads');

parentPort?.postMessage(main(workerData));

function groupByTicker(stockData) {
	const result = new Map();
	stockData.forEach(stock => {
		if (!result.has(stock.ticker)) result.set(stock.ticker, []);
		result.get(stock.ticker).push(stock);
	});
	return result;
}

function calculateAvgCostAndQuantity(ticker, stockData) {
	const result = { ticker, avgCost: 0, buyQuantity: 0, sellQuantity: 0 };
	let totalCost = 0;
	let totalBuyQuantity = 0;
	let totalSellQuantity = 0;
	let numOfSellTransaction = 0;

	stockData.forEach(stock => {
		if (stock.transactionType === 'sell') {
			numOfSellTransaction += stock.quantity;
			totalSellQuantity += stock.quantity;
			return;
		}

		totalBuyQuantity += stock.quantity;
		const buyQuantity = stock.quantity - numOfSellTransaction;
		if (buyQuantity > 0) {
			totalCost += stock.price * buyQuantity;
			numOfSellTransaction = 0;
			return;
		}

		if (buyQuantity < 0) {
			numOfSellTransaction = -buyQuantity;
			return;
		}

		numOfSellTransaction = 0;
	});

	result.avgCost =
		totalBuyQuantity - totalSellQuantity > 0
			? totalCost / (totalBuyQuantity - totalSellQuantity)
			: 0;
	result.buyQuantity = totalBuyQuantity;
	result.sellQuantity = totalSellQuantity;
	return result;
}

function main(stockData) {
	return [...groupByTicker(stockData)].map(([ticker, tickerData]) =>
		calculateAvgCostAndQuantity(ticker, tickerData)
	);
}
