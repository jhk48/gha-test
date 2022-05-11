import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonMixin, priceColorMixin, memoButtonMixin } from '@styles/Mixins';
import { listActionButtonStyle, Card } from '@components/index';

export const TotalRealizedProfitLossSection = styled(Card)`
	padding: 7px 5px;
	margin-bottom: 18px;
`;

export const TotalRealizedProfitLossAmount = styled.div`
	${priceColorMixin};
	margin-bottom: 6px;

	& > span {
		color: var(--baseTextColor);
		font-weight: 500;
	}
`;

export const CurrentAvgCost = styled.div`
	& > span {
		font-weight: 500;
	}
`;

export const SubHeader = styled.h2`
	line-height: 1;
	font-size: 28px;
`;

export const DateSection = styled.div`
	min-width: 140px;
`;

export const TransactionTypeSection = styled.div`
	min-width: 80px;
`;

export const PriceSection = styled.div`
	min-width: 150px;
`;

export const QuantitySection = styled.div`
	min-width: 120px;
`;

export const MemoSection = styled.div`
	min-width: 90px;
`;

export const MemoOpenButton = styled.button`
	${memoButtonMixin};
`;

export const RealizedProfitAndLossSection = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	width: 330px;
`;

export const StockTransactionActionsSection = styled.div`
	display: flex;
	justify-content: center;
	min-width: 200px;
`;

export const BackToHoldingsPageButton = styled(Link)`
	${buttonMixin};
	display: flex;
	align-items: center;
	background-color: var(--gray);
	color: var(--white);
	padding: 0.25em 0.45em;
	border-radius: 4px;
	text-decoration: none;

	& > svg {
		margin-right: 3px;
	}
`;

export const StockTransactionEditButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepOrange);
	margin-right: 14px;
`;

export const StockTransactionDeleteButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepRed);
`;
