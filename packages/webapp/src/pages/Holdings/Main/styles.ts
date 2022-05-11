import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonMixin, priceColorMixin } from '@styles/Mixins';

export const HoldingTickerSection = styled.div`
	min-width: 75px;
`;

export const HoldingDetailsSection = styled.div`
	min-width: 170px;
`;

export const HoldingDetailsOpenButton = styled(Link)`
	${buttonMixin};
	color: var(--gray);
	font-size: 14px;
	text-decoration: underline;
`;

export const HoldingCurrentPriceSection = styled.div`
	display: flex;

	min-width: 230px;
	${priceColorMixin};
`;

export const HoldingAvgPriceSection = styled.div`
	min-width: 140px;
`;

export const HoldingQuantitySection = styled.div`
	min-width: 125px;
`;

export const HoldingTotalValueSection = styled.div`
	min-width: 190px;
`;

export const HoldingDailyGainSection = styled.div`
	display: flex;
	${priceColorMixin};

	min-width: 230px;
`;

export const HoldingTotalGainSection = styled.div`
	display: flex;
	${priceColorMixin};

	min-width: 220px;
`;
