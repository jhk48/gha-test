export default function (number: number | string, fractionDigits: number) {
	const num = typeof number === 'string' ? Number(number) : number;
	return Number(num.toFixed(fractionDigits));
}
