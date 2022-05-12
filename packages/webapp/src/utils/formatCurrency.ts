type Currency = 'usd' | 'krw';

export default function formatCurrency(
	inputNum: string | number,
	currency: Currency,
	options?: Intl.NumberFormatOptions
) {
	const num = typeof inputNum === 'string' ? Number(inputNum) : inputNum;
	return Intl.NumberFormat(currencyCode[currency], {
		style: 'currency',
		currency,
		maximumFractionDigits: 2,
		...options
	}).format(num);
}

const currencyCode = {
	usd: 'en-US',
	krw: 'ko-KR'
};
