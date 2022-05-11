import styled from 'styled-components';
import { memoButtonMixin, priceColorMixin } from '@styles/Mixins';
import { listActionButtonStyle, Card } from '@components/index';

export const TotalCashAmountSection = styled(Card)`
	${priceColorMixin};
	padding: 7px 5px;
	margin-bottom: 18px;

	& > span {
		color: var(--baseTextColor);
		font-weight: 500;
	}
`;

export const DateSection = styled.div`
	min-width: 150px;
`;

export const CashTypeSection = styled.div`
	min-width: 110px;
`;

export const AmountSection = styled.div`
	${priceColorMixin};
	min-width: 200px;
`;

export const MemoSection = styled.div`
	min-width: 90px;
`;

export const MemoOpenButton = styled.button`
	${memoButtonMixin};
`;

export const ActionsSection = styled.div`
	display: flex;
	justify-content: center;
	min-width: 300px;
`;

export const CashTransactionEditButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepOrange);
	margin-right: 14px;
`;

export const CashTransactionDeleteButton = styled.button`
	${listActionButtonStyle};
	color: var(--deepRed);
`;
