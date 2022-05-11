import styled, { css } from 'styled-components';
import Card from '@components/Card';
import { Link } from 'react-router-dom';
import * as Mixin from '@styles/Mixins';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';

interface HeaderContainerProps {
	flexDirection: 'row' | 'column';
}

interface SectionProps extends Mixin.FlexProps {
	margin?: string;
}

const midBotSectionLayout = css`
	width: 30%;
	max-width: 20em;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 16px;
	}
`;

export const Section = styled.section<SectionProps>`
	${Mixin.flexCenter};
	flex-direction: ${({ flexDirection }) => flexDirection};
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	max-width: 1600px;
	margin: 0 auto;
	margin: ${({ margin }) => margin};
`;

export const HeaderContainer = styled.div<HeaderContainerProps>`
	${Mixin.flexCenter}
	flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Header = styled.header`
	display: inline-block;
	font-size: 48px;
	font-weight: 700;
	margin-bottom: 1.5em;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 40px;
	}
`;

export const HeaderPrimary = styled.span`
	color: var(--primary);
`;

export const HeroImageContainer = styled.div`
	display: inline-block;
	margin: 1.5em 5em 1.5em 1.5em;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		& > svg {
			width: 500px;
			height: 390px;
		}
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		& > svg {
			width: 450px;
			height: 351px;
		}
	}
`;

export const Button = styled.button`
	${Mixin.buttonMixin};
	background-color: var(--primary);
	color: var(--white);
	font-weight: 500;
	border-radius: 6px;
	padding: 0.6em 3.2em;
`;

export const LinkButton = styled(Link)`
	${Mixin.buttonMixin};
	text-decoration: none;
	background-color: var(--primary);
	color: var(--white);
	font-weight: 500;
	border-radius: 6px;
	padding: 0.6em 3.2em;
`;

export const IndexContainer = styled(Card)`
	${midBotSectionLayout};
`;

export const IndexHeader = styled.header`
	text-align: center;
	font-size: 18px;
	font-weight: 700;
	padding: 0.4em 0;
	border-bottom: 1px solid var(--indexCardHeaderBorderColor);
`;

export const IndexInfo = styled.div`
	${Mixin.priceColorMixin};
`;

export const IndexPriceContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 0.8em 0 0.5em;
`;

export const IndexPrice = styled.span`
	font-size: 22px;
	font-weight: 700;
`;

export const IndexPriceChange = styled.span`
	display: flex;
	align-items: center;
`;

export const IndexChangePercent = styled.div`
	padding: 0.3em 0 0.6em;
	font-size: 16px;
	text-align: center;
`;

export const TopStocksListSection = styled.section`
	${midBotSectionLayout};
`;

export const TopStocksListHeader = styled(Link)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	color: var(--baseTextColor);
	text-decoration: none;
	margin-bottom: 2em;

	& > svg {
		position: absolute;
		right: -11px;
		fill: var(--baseTextColor);
	}
`;

export const TopStocksListItems = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export const TopStocksListItem = styled(Card)`
	list-style-type: none;
	margin-bottom: 1.2em;
	cursor: pointer;
`;

export const TopStocksListItemLink = styled(Link)`
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 0.8em 0;
`;

export const TopStocksListItemTicker = styled.span`
	width: 20%;
	text-transform: uppercase;
	font-weight: 500;
	color: var(--baseTextColor);
`;

export const TopStocksListItemChangePercent = styled.span`
	width: 32%;
	${Mixin.priceColorMixin};
`;

export const TopStocksListItemPrice = styled.span`
	width: 22%;
	color: var(--baseTextColor);
	overflow: hidden;
	text-overflow: ellipsis;
`;
