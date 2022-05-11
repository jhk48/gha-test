import { Theme } from '@types';
import { formatCurrency } from '@utils';
import yPos from './appliedYPos';
import {
	NUM_OF_HORIZONTAL_GRID,
	Y_AXIS_MARGIN,
	Y_AXIS_LEGEND_GAP,
	HORIZONTAL_GRID_THICKNESS
} from '../constants';
import { crispPixel } from '../../utils';
import { textColor, gridColor } from '../../colors';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	minValue: number;
	maxValue: number;
	canvasWidth: number;
	canvasHeight: number;
}

export default function drawHorizontalGrid({
	ctx,
	theme,
	minValue,
	maxValue,
	canvasWidth,
	canvasHeight
}: Props) {
	ctx.font = 'bold 14px NotoSansKR';

	const HORIZONTAL_GRID_GAP = (maxValue - minValue) / (NUM_OF_HORIZONTAL_GRID - 1);
	const legendXPos = Y_AXIS_MARGIN - Y_AXIS_LEGEND_GAP;
	const gridLength = canvasWidth - Y_AXIS_MARGIN * 2;
	const maxTextWidth = ctx.measureText(formatCurrency(maxValue, 'usd')).width;

	ctx.lineWidth = HORIZONTAL_GRID_THICKNESS;
	ctx.strokeStyle = gridColor(theme);
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'left';
	ctx.fillStyle = textColor(theme);

	ctx.beginPath();
	let gridVal = minValue;
	for (let i = 0; i < NUM_OF_HORIZONTAL_GRID; i++) {
		ctx.moveTo(
			crispPixel(Y_AXIS_MARGIN + Y_AXIS_LEGEND_GAP + maxTextWidth, HORIZONTAL_GRID_THICKNESS),
			crispPixel(
				yPos({ canvasHeight, value: gridVal, minValue, maxValue }),
				HORIZONTAL_GRID_THICKNESS
			)
		);
		ctx.lineTo(
			crispPixel(gridLength, HORIZONTAL_GRID_THICKNESS),
			crispPixel(
				yPos({ canvasHeight, value: gridVal, minValue, maxValue }),
				HORIZONTAL_GRID_THICKNESS
			)
		);
		ctx.fillText(
			formatCurrency(gridVal, 'usd'),
			Math.floor(legendXPos),
			yPos({ canvasHeight, value: gridVal, minValue, maxValue })
		);
		gridVal += HORIZONTAL_GRID_GAP;
		if (gridVal > maxValue) gridVal = maxValue;
	}
	ctx.stroke();
}
