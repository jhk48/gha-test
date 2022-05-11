import { Theme, AssetChartData } from '@types';
import { formatCurrency } from '@utils';
import yPos from './appliedYPos';
import {
	VERTICAL_GRID_THICKNESS,
	X_AXIS_LEGEND_GAP,
	Y_AXIS_LEGEND_GAP,
	Y_AXIS_MARGIN
} from '../constants';
import { crispPixel } from '../../utils';
import { textColor, gridColor } from '../../colors';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	canvasWidth: number;
	canvasHeight: number;
	minValue: number;
	maxValue: number;
	chartData: AssetChartData[];
	numOfVerticalGrids: number;
}

export default function drawVerticalGrid({
	ctx,
	theme,
	canvasWidth,
	canvasHeight,
	minValue,
	maxValue,
	chartData,
	numOfVerticalGrids
}: Props) {
	ctx.font = 'bold 14px NotoSansKR';
	const maxTextWidth = ctx.measureText(formatCurrency(maxValue, 'usd')).width;
	const verticalGridGap =
		(canvasWidth - maxTextWidth - Y_AXIS_MARGIN * 3 - Y_AXIS_LEGEND_GAP) / (numOfVerticalGrids - 1);

	ctx.lineWidth = VERTICAL_GRID_THICKNESS;
	ctx.strokeStyle = gridColor(theme);
	ctx.textAlign = 'center';
	ctx.font = '12px NotoSansKR';
	ctx.beginPath();

	let gridXPos = maxTextWidth + Y_AXIS_MARGIN + Y_AXIS_LEGEND_GAP;
	for (let i = 0; i < numOfVerticalGrids; i++) {
		ctx.fillStyle = textColor(theme);
		ctx.moveTo(
			crispPixel(gridXPos, VERTICAL_GRID_THICKNESS),
			crispPixel(
				yPos({ canvasHeight, value: maxValue, minValue, maxValue }),
				VERTICAL_GRID_THICKNESS
			)
		);
		ctx.lineTo(
			crispPixel(gridXPos, VERTICAL_GRID_THICKNESS),
			crispPixel(
				yPos({ canvasHeight, value: minValue, minValue, maxValue }),
				VERTICAL_GRID_THICKNESS
			)
		);
		if (i < chartData.length) {
			ctx.fillText(
				formatChartDateText(chartData.at(-(i + 1))!.createdAt),
				Math.floor(gridXPos),
				yPos({ canvasHeight, value: minValue, minValue, maxValue }) + X_AXIS_LEGEND_GAP
			);
		}
		gridXPos += verticalGridGap;
	}
	ctx.stroke();
}

function formatChartDateText(text: string) {
	return text.slice(2, 10).replace(/-/g, '/');
}
