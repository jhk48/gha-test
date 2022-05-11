import styled from 'styled-components';
import Card from '@components/Card';
import { priceColorMixin } from '@styles/Mixins';

interface ItemIconBgColorProp {
	bgColor: 'gray' | 'blue';
}

export const ITEM_UPPER_LOWER_PADDING_PX = 8;
const PROFIT_LOSS_ASSET_ITEM_HEIGHT_PX = 134;
const PIE_CHART_CONTAINER_HEIGHT_PX = 400;
export const CANVAS_PADDING_PX = 10;

export const DashboardContainer = styled.div`
	max-width: 1500px;
	margin: 0 auto;
	padding: 20px 30px;
	display: flex;
	flex-direction: column;
	gap: 40px;
`;

export const ItemIconContainer = styled.div<ItemIconBgColorProp>`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: -13px;
	left: 6px;
	width: 36px;
	height: 36px;
	padding: 4px;
	border-radius: 4px;
	background-color: ${({ bgColor }) =>
		bgColor === 'gray'
			? 'var(--dashboardItemIconBgColorGray)'
			: 'var(--dashboardItemIconBgColorBlue)'};

	& > svg {
		fill: var(--white);
		stroke: var(--white);
	}
`;

export const ItemHeader = styled.h2`
	text-align: center;
	font-size: 18px;
`;

export const PortfolioSelectContainer = styled.div`
	margin-left: auto;

	& > select {
		margin: 0;
	}
`;

export const ProfitLossAssetContainer = styled.section`
	display: flex;
	justify-content: space-evenly;
	gap: 30px;
`;

export const ProfitLossAssetItem = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
	display: flex;
	flex-direction: column;
	height: ${PROFIT_LOSS_ASSET_ITEM_HEIGHT_PX}px;
`;

export const ProfitLossAssetAmount = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 17px;
	padding: 0 5%;
	font-size: 24px;
	font-weight: 500;
`;

export const ProfitLossAssetPercent = styled.div`
	${priceColorMixin};
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-top: 14px;
`;

export const DividendPieChartContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	height: ${PIE_CHART_CONTAINER_HEIGHT_PX}px;
`;

export const SelectNumOfItemsContainer = styled.div`
	position: absolute;
	top: ${ITEM_UPPER_LOWER_PADDING_PX}px;
	right: ${ITEM_UPPER_LOWER_PADDING_PX}px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const Select = styled.select`
	background-color: var(--navbarBgColor);
	color: var(--baseTextColor);
	outline: none;
	border-radius: 2px;
`;

export const NoticeEmptyHoldingsList = styled.div`
	margin-top: 30px;
	text-align: center;
`;
