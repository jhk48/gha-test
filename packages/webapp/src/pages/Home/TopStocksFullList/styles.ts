import { Link } from 'react-router-dom';
import Card from '@components/Card';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { priceColorMixin } from '@styles/Mixins';
import styled, { css } from 'styled-components';

export const sectionCommonStyle = css`
	display: flex;
	align-items: center;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 14px;
		& svg {
			width: 16px;
			height: 16px;
		}
	}
`;

export const tickerSectionStyle = css`
	${sectionCommonStyle};
	width: 100px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		width: 85px;
	}
`;

export const priceSectionStyle = css`
	${sectionCommonStyle};
	width: 140px;
`;

export const priceChangeStyle = css`
	${sectionCommonStyle};
	width: 120px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		width: 110px;
	}
`;

export const priceChangePercentStyle = css`
	${sectionCommonStyle};
	width: 130px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.mobileLandScape}px) {
		width: 120px;
	}
`;

export const TopStocksFullListHeader = styled.header`
	font-size: 36px;
	font-weight: 700;
	text-align: center;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 30px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		font-size: 26px;
	}
`;

export const TopStocksFullListItemHeaders = styled.div`
	margin: 40px auto 14px;
	padding: 0 10px;
	font-weight: 700;
	display: flex;
	justify-content: space-between;
`;

export const ListHeaderTickerSection = styled.span`
	${tickerSectionStyle};
`;

export const ListHeaderPriceSection = styled.span`
	${priceSectionStyle};
`;

export const ListHeaderPriceChangeSection = styled.span`
	${priceChangeStyle};
`;

export const ListHeaderPriceChangePercentSection = styled.span`
	${priceChangePercentStyle};
`;

export const TopStocksFullListContainer = styled.div`
	margin: 0 auto;
	padding: 0 20px;
	max-width: 800px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		max-width: 700px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tablet}px) {
		max-width: 630px;
	}
`;

export const TopStocksFullListItem = styled(Card)`
	&:not(:last-child) {
		margin-bottom: 18px;
	}

	&:last-child {
		margin-bottom: 2px;
	}
`;

export const TopStocksFullListItemLink = styled(Link)`
	display: flex;
	justify-content: space-between;
	text-decoration: none;
	padding: 10px;
`;

export const ListItemTickerSection = styled.span`
	${tickerSectionStyle};
	color: var(--baseTextColor);
`;

export const ListItemPriceSection = styled.span`
	${priceColorMixin};
	${priceSectionStyle};
`;

export const ListItemChangeSection = styled.span`
	${priceColorMixin};
	${priceChangeStyle};
`;

export const ListItemChangePercentSection = styled.span`
	${priceColorMixin};
	${priceChangePercentStyle};
`;
