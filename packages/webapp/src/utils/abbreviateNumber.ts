import formatCurrency from './formatCurrency';
import formatNum from './formatNumber';

const ONE_MILLION = 1_000_000;
const ONE_BILLION = 1_000_000_000;
const ONE_TRILLION = 1_000_000_000_000;

const currencyPostfix = {
	usd: {
		ONE_MILLION: 'M',
		ONE_BILLION: 'B',
		ONE_TRILLION: 'T'
	},
	krw: {
		ONE_MILLION: '백만',
		ONE_BILLION: '십억',
		ONE_TRILLION: '조'
	}
};

export default function abbreviateNumber(num: number, currency?: 'usd' | 'krw') {
	if (currency) {
		if (num < ONE_MILLION) return formatCurrency(num, currency);
		if (num < ONE_BILLION) {
			return `${formatCurrency(num / ONE_MILLION, currency, {
				minimumFractionDigits: 2
			})}${currencyPostfix[currency].ONE_MILLION}`;
		}
		if (num < ONE_TRILLION) {
			return `${formatCurrency(num / ONE_BILLION, currency, {
				minimumFractionDigits: 2
			})}${currencyPostfix[currency].ONE_BILLION}`;
		}
		return `${formatCurrency(num / ONE_TRILLION, currency, {
			minimumFractionDigits: 2
		})}${currencyPostfix[currency].ONE_TRILLION}`;
	}

	if (num < ONE_MILLION) return formatNum(num);
	if (num < ONE_BILLION) {
		return `${formatNum(num / ONE_MILLION, { minimumFractionDigits: 2 })}M`;
	}
	if (num < ONE_TRILLION) {
		return `${formatNum(num / ONE_BILLION, { minimumFractionDigits: 2 })}B`;
	}
	return `${formatNum(num / ONE_TRILLION, { minimumFractionDigits: 2 })}T`;
}
