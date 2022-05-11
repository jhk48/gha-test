import { Theme } from '@types';
import { textColor } from '../../colors';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	x: number;
	canvasHeight: number;
	ticker: string;
}

export default function drawBarTickerText({ ctx, theme, x, canvasHeight, ticker }: Props) {
	const textMetrics = ctx.measureText(ticker);
	const tickerTextHeight =
		textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
	const tickerTextY = koreanTickerNames.has(ticker)
		? canvasHeight - tickerTextHeight - 1
		: canvasHeight - tickerTextHeight + 2.5;

	ctx.font = '14px NotoSansKR';
	ctx.textAlign = 'center';
	ctx.textBaseline = koreanTickerNames.has(ticker) ? 'top' : 'middle';
	ctx.fillStyle = textColor(theme);
	ctx.fillText(ticker, Math.floor(x), Math.floor(tickerTextY));
}

const koreanTickerNames = new Set(['현금', '기타']);
