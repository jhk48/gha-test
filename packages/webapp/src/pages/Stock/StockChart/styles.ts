import styled from 'styled-components';
import { WIDTH_BREAK_POINT_PX } from '@constants/breakPoints';
import { CHART_HEIGHT_PX } from '../constants';

export const ChartContainer = styled.div`
	width: 100%;
	height: ${CHART_HEIGHT_PX.desktop}px;

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.laptop}px) {
		height: ${CHART_HEIGHT_PX.laptop}px;
	}

	@media screen and (max-width: ${WIDTH_BREAK_POINT_PX.tabletLandScape}px) {
		height: ${CHART_HEIGHT_PX.tabletLandScape}px;
	}
`;

export const ChartLoadingIndicator = styled.p`
	text-align: center;
`;
