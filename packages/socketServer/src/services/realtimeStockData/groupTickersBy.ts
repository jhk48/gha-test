export default function groupTickersBy(sizeOfGroup: number, tickers: string[]) {
	const result = [];
	for (let i = 0; i < tickers.length; i += sizeOfGroup) {
		result.push(tickers.slice(i, i + sizeOfGroup));
	}
	return result;
}
