import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Card } from '@components/index';
import { priceColorMixin } from '@styles/Mixins';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { stockPageBaseFontStyle } from '../styles';
import { MAIN_SECTION_HEIGHT_PX, STOCK_INFO_PANEL_WIDTH_PX } from '../constants';

const STOCK_LINK_INDICATOR_HEIGHT = '3px';

const stockSectionMaxWidthStyle = css`
	max-width: 1500px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		max-width: 1340px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		max-width: 1120px;
	}
`;

export const StockMainSection = styled.section`
	${stockPageBaseFontStyle};
	${stockSectionMaxWidthStyle};
	position: relative;
	margin: 0 auto;
	padding: 4px 0 ${STOCK_LINK_INDICATOR_HEIGHT};
	border-bottom: 1px solid var(--stockPageBorderColor);
	height: ${MAIN_SECTION_HEIGHT_PX.desktop}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		height: ${MAIN_SECTION_HEIGHT_PX.laptop}px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: ${MAIN_SECTION_HEIGHT_PX.tabletLandScape}px;
	}
`;

export const StockSubSection = styled.section`
	${stockSectionMaxWidthStyle};
	margin: 0 auto;
	display: flex;
	position: relative;
	padding: 20px 0 50px;
`;

export const StockSubPageWrapper = styled.div`
	width: 75%;
`;

export const CompanyName = styled.header`
	color: var(--baseTextColor);
	font-weight: 700;
	font-size: 32px;
	white-space: nowrap;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const TickerContainer = styled.div`
	display: flex;
	align-items: baseline;
	margin-top: 6px;
`;

export const StockExchange = styled.span`
	font-size: 14px;
	margin-left: 6px;
	color: var(--stockPageTextSubColor);
	line-height: 1;
`;

export const Ticker = styled.span`
	font-size: 18px;
	color: var(--stockPageTextSubColor);
	line-height: 1;
`;

export const PriceSection = styled.section`
	display: flex;
	align-items: flex-end;
	${priceColorMixin};
	margin: 28px 0 0;
`;

export const CurrentPrice = styled.div`
	display: flex;
	align-items: flex-start;
	font-size: 30px;
	font-weight: 700;
	margin-right: 8px;
	line-height: 1;
`;

export const CurrencySymbol = styled.div`
	font-size: 0.7em;
	color: var(--stockPageTextSubColor);
`;

export const PriceChangeContainer = styled.div`
	display: flex;
	align-items: center;
	line-height: 1;
	font-size: 1.5em;
`;

export const PriceChange = styled.div`
	display: flex;
	align-items: center;
`;

export const StockMenuSection = styled.div`
	position: absolute;
	bottom: ${STOCK_LINK_INDICATOR_HEIGHT};
`;

export const StockMenuLink = styled(NavLink)`
	position: relative;
	text-decoration: none;
	font-size: 1.1em;
	font-weight: 500;
	margin-right: 3.4em;
	color: var(--stockPageTextSubColor);

	&.active {
		color: var(--primary);

		&::after {
			position: absolute;
			left: 0;
			bottom: -5px;
			content: '';
			border-top: ${STOCK_LINK_INDICATOR_HEIGHT} solid var(--primary);
			width: 100%;
		}
	}
`;

export const StockInfoPanelContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	right: 0;
	top: -140px;
	font-size: 14px;
	width: ${STOCK_INFO_PANEL_WIDTH_PX.desktop}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		width: ${STOCK_INFO_PANEL_WIDTH_PX.laptop}px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: ${STOCK_INFO_PANEL_WIDTH_PX.tabletLandScape}px;
	}
`;

export const InfoPanel = styled(Card)`
	margin: 0;
	padding: 18px 12px;
	width: 100%;
	list-style-type: none;
`;

export const PanelItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14px 0;
`;

export const PanelItemTitle = styled.span`
	color: var(--stockPageTextSubColor);
`;
