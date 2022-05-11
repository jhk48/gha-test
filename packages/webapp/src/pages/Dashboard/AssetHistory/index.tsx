import { useRef, useState, useEffect, MouseEvent } from 'react';
import { useThemeMode } from '@hooks/index';
import { CurveLineChart as CurveLineChartIcon } from '@components/Icon';
import * as Style from './styles';
import { useChartDataBuffer } from './hooks';
import { adjustToDpr } from '../utils';
import { drawHorizontalGrid, drawLine, drawVerticalGrid } from './utils';
import { NUM_OF_HORIZONTAL_GRID } from './constants';
import { ItemHeader, ItemIconContainer, NoticeEmptyHoldingsList } from '../styles';

interface Props {
	portfolioId: number;
}

const COUNT = 14;

export default function AssetHistory({ portfolioId }: Props) {
	const [theme] = useThemeMode();
	const assetChartRef = useRef<HTMLCanvasElement>(null);
	const [currentWindow, setCurrentWindow] = useState({ s: 0, e: COUNT - 1 });
	const { chartDataBuffer, isReachedEnd } = useChartDataBuffer({
		portfolioId,
		count: COUNT,
		currentWindow
	});
	const chartData = chartDataBuffer.slice(currentWindow.s, currentWindow.e + 1);
	const maxTotalAsset = Math.max(...chartData.map(({ totalAsset }) => totalAsset));
	const minTotalAsset = Math.min(...chartData.map(({ totalAsset }) => totalAsset));

	useEffect(() => {
		setCurrentWindow({ s: 0, e: COUNT - 1 });
	}, [portfolioId]);

	useEffect(() => {
		if (!assetChartRef.current) return;
		const assetChartCanvas = assetChartRef.current;
		const ctx = adjustToDpr(assetChartCanvas.getContext('2d'), assetChartCanvas);
		if (!ctx) return;

		const canvasWidth = assetChartCanvas.clientWidth;
		const canvasHeight = assetChartCanvas.clientHeight;

		const minMaxDiff = (maxTotalAsset - minTotalAsset) / (NUM_OF_HORIZONTAL_GRID - 1);
		const adjustedMaxValue =
			minMaxDiff < 1 ? minTotalAsset + (NUM_OF_HORIZONTAL_GRID - 1) : maxTotalAsset;

		drawHorizontalGrid({
			ctx,
			theme,
			minValue: minTotalAsset,
			maxValue: adjustedMaxValue,
			canvasWidth,
			canvasHeight
		});

		drawVerticalGrid({
			ctx,
			theme,
			minValue: minTotalAsset,
			maxValue: adjustedMaxValue,
			canvasWidth,
			canvasHeight,
			chartData,
			numOfVerticalGrids: COUNT
		});

		drawLine({
			ctx,
			theme,
			minValue: minTotalAsset,
			maxValue: adjustedMaxValue,
			canvasWidth,
			canvasHeight,
			chartData,
			numOfVerticalGrids: COUNT
		});
	}, [theme, chartData, minTotalAsset, maxTotalAsset]);

	const isGrabbedChart = useRef(false);
	const startXPos = useRef(0);
	function enableGrabbedState(e: MouseEvent<HTMLCanvasElement>) {
		if (!assetChartRef.current) return;

		isGrabbedChart.current = true;
		assetChartRef.current.style.cursor = 'grabbing';
		startXPos.current = e.clientX;
	}

	function disableGrabbedState() {
		if (!assetChartRef.current) return;

		isGrabbedChart.current = false;
		assetChartRef.current.style.cursor = 'default';
	}

	function slideChart(e: MouseEvent<HTMLCanvasElement>) {
		if (!isGrabbedChart.current) return;
		if (!assetChartRef.current) return;

		e.preventDefault();
		const dx = startXPos.current - e.clientX;

		if (dx < 0) {
			setCurrentWindow(prev => {
				if (isReachedEnd.current && prev.e >= chartDataBuffer.length - 1) {
					return prev;
				}
				return { s: prev.s + 1, e: prev.e + 1 };
			});
		}

		if (dx > 0) {
			setCurrentWindow(prev => {
				if (prev.s === 0) return prev;
				return { s: prev.s - 1, e: prev.e - 1 };
			});
		}
	}

	function isChartDataEmpty() {
		return chartData.length === 0;
	}

	return (
		<Style.AssetHistoryContainer>
			<ItemIconContainer bgColor="blue">
				<CurveLineChartIcon width={32} height={32} />
			</ItemIconContainer>
			<ItemHeader>자산 추이</ItemHeader>
			{isChartDataEmpty() ? (
				<NoticeEmptyHoldingsList>차트 데이터가 존재하지 않습니다.</NoticeEmptyHoldingsList>
			) : (
				<Style.AssetHistoryChart
					ref={assetChartRef}
					onMouseDown={enableGrabbedState}
					onMouseUp={disableGrabbedState}
					onMouseMove={slideChart}
				/>
			)}
		</Style.AssetHistoryContainer>
	);
}
