import { css } from 'styled-components';

export interface PriceColorProps {
	value?: number;
}

function calculatePriceColor(value: number | undefined) {
	if (value === undefined) return '';
	if (value > 0) return 'var(--priceGreen)';
	if (value < 0) return 'var(--priceRed)';
	return 'var(--gray)';
}

const priceColorMixin = css<PriceColorProps>`
	color: ${({ value }) => calculatePriceColor(value)};

	& svg {
		fill: ${({ value }) => calculatePriceColor(value)};
	}
`;

export default priceColorMixin;
