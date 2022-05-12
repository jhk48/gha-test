import { Theme } from '@types';
import { formatNum } from '@utils';
import { textColor } from '../../colors';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	x: number;
	y: number;
	ratio: number;
}

export default function drawBarRatioText({ ctx, theme, x, y, ratio }: Props) {
	ctx.font = '14px NotoSansKR';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = textColor(theme);
	ctx.fillText(`${formatNum(ratio)}%`, Math.floor(x), Math.floor(y));
}
