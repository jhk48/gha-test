import styled from 'styled-components';
import Card from '@components/Card';
import { ITEM_UPPER_LOWER_PADDING_PX, CANVAS_PADDING_PX } from '../styles';

const ASSET_HISTORY_CONTAINER_HEIGHT_PX = 420;

export const AssetHistoryContainer = styled(Card)`
	padding: ${ITEM_UPPER_LOWER_PADDING_PX}px 0;
	height: ${ASSET_HISTORY_CONTAINER_HEIGHT_PX}px;
`;

export const AssetHistoryChart = styled.canvas`
	width: 100%;
	height: calc(100% - ${ITEM_UPPER_LOWER_PADDING_PX * 2}px - 2px);
	padding: ${CANVAS_PADDING_PX}px;
`;
