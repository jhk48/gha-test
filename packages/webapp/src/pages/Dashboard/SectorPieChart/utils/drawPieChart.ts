import { Theme, SectorPieChartRatio } from '@types';
import { sectorPieChartColors } from '../../colors';

interface Props {
	ctx: CanvasRenderingContext2D;
	theme: Theme;
	chartData: SectorPieChartRatio[];
	x: number;
	y: number;
	radius: number;
}

export default function drawPieChart({ ctx, theme, chartData, x, y, radius }: Props) {
	chartData.reduce((prevEndArc, { ratio }, idx) => {
		const curEndArc = prevEndArc + Math.PI * 2 * ratio;
		ctx.fillStyle = sectorPieChartColors(theme, idx);
		ctx.beginPath();
		ctx.moveTo(Math.floor(x), Math.floor(y));
		ctx.arc(Math.floor(x), Math.floor(y), radius, prevEndArc, curEndArc);
		ctx.fill();
		return curEndArc;
	}, 0);
}
