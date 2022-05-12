export default function formatNum(inputNum: string | number, options?: Intl.NumberFormatOptions) {
	const num = typeof inputNum === 'string' ? Number(inputNum) : inputNum;
	return Intl.NumberFormat('en-US', { maximumFractionDigits: 2, ...options }).format(num);
}
