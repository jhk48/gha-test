import styled, { css } from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import Card from '@components/Card';
import { ITEM_UPPER_LOWER_PADDING_PX, CANVAS_PADDING_PX } from '../styles';

interface LegendColorBoxProps {
	backgroundColor: string;
}

interface RatioColorBarProps {
	width: number;
}

const SectorSectionWidthPx = 130;

const includedStocksWidthStyle = css`
	width: 15em;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: 12em;
	}
`;

const ratioSectionWidthStyle = css`
	width: calc(100% - ${SectorSectionWidthPx}px - 15em);

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		width: calc(100% - ${SectorSectionWidthPx}px - 12em);
	}
`;

export const SectorPieChartSection = styled.section`
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

export const SectorPieChartContainer = styled(Card)`
	width: 60%;
	height: 100%;
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
`;

export const PieChartContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: space-evenly;
`;

export const PieChartCanvas = styled.canvas`
	aspect-ratio: 1 / 1;
	height: calc(100% - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 2px);
	padding: ${CANVAS_PADDING_PX * 5}px;
`;

export const LegendContainer = styled.div`
	width: 30%;
	height: calc(100% - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 2px);
	display: flex;
	align-items: center;
	font-size: 14px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 13px;
	}
`;

export const LegendList = styled.ul`
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

export const LegendListItem = styled.li`
	display: flex;
	align-items: center;
	gap: 10px;

	& + & {
		margin-top: 12px;
	}
`;

export const LegendColorBox = styled.div<LegendColorBoxProps>`
	width: 30px;
	height: 14px;
	background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const LegendItemText = styled.span``;

export const DetailsContainer = styled(Card)`
	width: 40%;
	height: 100%;
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 4px;

	& > ul {
		max-height: calc(100% - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 1.1em * 1.5 - 16px * 1.5);
	}
`;

export const DetailsListHeaders = styled.div`
	display: flex;
	font-size: 14px;
	font-weight: 700;
	margin: 10px 0 6px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		font-size: 13px;
	}
`;

export const DetailsListSectorHeader = styled.div`
	width: ${SectorSectionWidthPx}px;
	padding-left: 4px;
`;

export const DetailsListIncludedStocksHeader = styled.div`
	${includedStocksWidthStyle};
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

export const Sector = styled.div`
	${listItemStyle};
	position: relative;
	width: ${SectorSectionWidthPx}px;
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

export const IncludedStocks = styled.div`
	${listItemStyle};
	${includedStocksWidthStyle};
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
