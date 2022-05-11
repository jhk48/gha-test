import { Theme } from '@types';
import yPos from './appliedYPos';
import { AXIS_THICKNESS, Y_AXIS_MARGIN } from '../constants';
import { textColor } from '../../colors';
import { crispPixel } from '../../utils';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	maxValue: number;
	canvasWidth: number;
	canvasHeight: number;
}

export default function drawAxis({ ctx, theme, maxValue, canvasWidth, canvasHeight }: Props) {
	ctx.lineWidth = AXIS_THICKNESS;
	ctx.strokeStyle = textColor(theme);
	ctx.beginPath();
	ctx.moveTo(crispPixel(Y_AXIS_MARGIN, AXIS_THICKNESS), crispPixel(0, AXIS_THICKNESS));
	ctx.lineTo(
		crispPixel(Y_AXIS_MARGIN, AXIS_THICKNESS),
		crispPixel(yPos({ canvasHeight, value: 0, maxValue }), AXIS_THICKNESS)
	);
	ctx.lineTo(
		crispPixel(canvasWidth, AXIS_THICKNESS),
		crispPixel(yPos({ canvasHeight, value: 0, maxValue }), AXIS_THICKNESS)
	);
	ctx.stroke();
}
