import { HoldingsRatio } from '@types';
import yPos from './appliedYPos';
import { AXIS_THICKNESS, Y_AXIS_MARGIN, DEFAULT_GAP_BTW_BARS, MAX_BAR_WIDTH } from '../constants';

interface Props {
	barData: HoldingsRatio[];
	maxValue: number;
	canvasWidth: number;
	canvasHeight: number;
	numOfBars: number;
}

export default function calcBarGeometry({
	barData,
	maxValue,
	canvasWidth,
	canvasHeight,
	numOfBars
}: Props) {
	let gapBtwBars = DEFAULT_GAP_BTW_BARS;
	let barWidth = Math.floor(
		(canvasWidth - Y_AXIS_MARGIN - (numOfBars + 1) * gapBtwBars) / numOfBars
	);

	if (barWidth > MAX_BAR_WIDTH) {
		barWidth = MAX_BAR_WIDTH;
		gapBtwBars = (canvasWidth - Y_AXIS_MARGIN - barWidth * numOfBars) / (numOfBars + 1);
	}

	const barBottomYPos = yPos({
		canvasHeight: canvasHeight - AXIS_THICKNESS,
		value: 0,
		maxValue
	});
	return barData.map(({ ticker, ratio, value }, i) => {
		const barYPos = yPos({ canvasHeight, value: ratio, maxValue });
		return {
			x: Math.floor(Y_AXIS_MARGIN + gapBtwBars * (i + 1) + barWidth * i),
			y: barYPos,
			width: barWidth,
			height: barBottomYPos - barYPos,
			ticker,
			ratio,
			value
		};
	});
}
