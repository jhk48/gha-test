import { Theme } from '@types';
import { barColorsLight, barColorsDark } from './barColors';
import { sectorPieChartLight, sectorPieChartDark } from './pieColors';

export function textColor(theme: Theme) {
	return theme === 'light' ? '#000' : '#FFF';
}

export function gridColor(theme: Theme) {
	return theme === 'light' ? `hsl(210, 11%, 50%)` : `hsl(210, 11%, 70%)`;
}

export function assetChartLineColor(theme: Theme) {
	return theme === 'light' ? 'hsl(198, 93%, 43%)' : 'hsl(198, 98%, 60%)';
}

export function barColors(theme: Theme, idx: number, ticker: string) {
	const numOfColors = barColorsLight.length;
	if (ticker === '현금') return theme === 'light' ? 'hsl(60, 89%, 60%)' : 'hsl(60, 89%, 55%)';
	return theme === 'light' ? barColorsLight[idx % numOfColors] : barColorsDark[idx % numOfColors];
}

export function sectorPieChartColors(theme: Theme, idx: number) {
	return theme === 'light' ? sectorPieChartLight[idx] : sectorPieChartDark[idx];
}
