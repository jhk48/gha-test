import styled, { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import Card from '@components/Card';
import { ITEM_UPPER_LOWER_PADDING_PX, CANVAS_PADDING_PX } from '../styles';

interface RatioColorBarProps {
	width: number;
}

const TickerSectionWidthPx = 120;

const valueSectionWidthStyle = css`
	width: 14em;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: 12em;
	}
`;

const ratioSectionWidthStyle = css`
	width: calc(100% - ${TickerSectionWidthPx}px - 14em);

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: calc(100% - ${TickerSectionWidthPx}px - 12em);
	}
`;

export const ProportionByValueSection = styled.section`
	display: flex;
	gap: 30px;
	width: 100%;
	height: 450px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		height: 420px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: 390px;
	}
`;

export const ProportionByValueChartContainer = styled(Card)`
	width: 60%;
	height: 100%;
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	position: relative;
`;

export const ProportionByValueChartCanvas = styled.canvas`
	width: 100%;
	height: calc(100% - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 2px);
	padding: ${CANVAS_PADDING_PX}px;
`;

export const DetailsContainer = styled(Card)`
	display: flex;
	flex-direction: column;
	width: 40%;
	height: 100%;
	padding: ${CANVAS_PADDING_PX}px 4px;

	& > ul {
		max-height: calc(100% - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 1.1em * 1.5 - 16px * 1.5);
	}
`;

export const DetailsListContainer = styled.div`
	overflow-y: scroll;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		width: 0;
	}
`;

export const DetailsListHeaders = styled.div`
	display: flex;
	font-size: 14px;
	font-weight: 700;
	margin: 10px 0 6px;
`;

export const DetailsListTickerHeader = styled.div`
	width: ${TickerSectionWidthPx}px;
	padding-left: 4px;
`;

export const DetailsListValueHeader = styled.div`
	${valueSectionWidthStyle};
	padding-left: 4px;
`;

export const DetailsListRatioHeader = styled.div`
	${ratioSectionWidthStyle};
	padding-left: 4px;
`;

export const DetailsList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

export const DetailsItem = styled.li`
	display: flex;
	border-bottom: 1px solid var(--baseBorderColor);
	font-size: 14px;

	&:first-child {
		border-top: 1px solid var(--baseBorderColor);
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 13px;
	}
`;

const listItemStyle = css`
	padding: 4px 6px;
`;

export const Ticker = styled.div`
	${listItemStyle};
	position: relative;
	width: ${TickerSectionWidthPx}px;
`;

export const OthersCategoryNotice = styled.div`
	position: absolute;
	top: 5px;
	right: 6px;
	font-size: 12px;
	background-color: var(--deepOrange);
	color: var(--white);
	border-radius: 2px;
	padding: 2px;
`;

export const Value = styled.div`
	${listItemStyle};
	${valueSectionWidthStyle};
	word-break: break-word;
`;

export const Ratio = styled.div`
	${listItemStyle};
	${ratioSectionWidthStyle};
	padding: 4px 0;
	position: relative;
`;

export const RatioColorBar = styled.div<RatioColorBarProps>`
	height: 100%;
	width: ${({ width }) => width}%;
	background: var(--dashboardDetailsPageRatioBar);
`;

export const RatioText = styled.p`
	position: absolute;
	top: 3px;
	left: 4px;
	z-index: 1;
`;
