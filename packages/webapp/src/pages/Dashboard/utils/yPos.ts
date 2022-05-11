interface YPosAppliedProps {
	canvasTopMargin: number;
	canvasBotMargin: number;
	xAxisMargin: number;
}

export interface YPosProps {
	canvasHeight: number;
	value: number;
	minValue?: number;
	maxValue: number;
}

export default function yPos({ canvasTopMargin, canvasBotMargin, xAxisMargin }: YPosAppliedProps) {
	return function ({ canvasHeight, value, minValue = 0, maxValue }: YPosProps) {
		return Math.floor(
			canvasTopMargin -
				xAxisMargin +
				(canvasHeight - canvasBotMargin) -
				((value - minValue) / (maxValue - minValue)) * (canvasHeight - canvasBotMargin)
		);
	};
}
