import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TradingViewWidget } from '@components/index';
import { useThemeMode } from '@hooks/index';
import * as Style from './styles';

export default function StockChart() {
	const chartContainerRef = useRef<HTMLDivElement>(null);
	const [currentTheme] = useThemeMode();
	const { ticker } = useParams() as { ticker: string };
	const [isChartLoading, setIsChartLoading] = useState(true);
	const [widgetDimension, setWidgetDimension] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (!chartContainerRef.current) return;
		setWidgetDimension({
			width: chartContainerRef.current.clientWidth,
			height: chartContainerRef.current.clientHeight
		});
	}, []);

	useEffect(() => {
		if (widgetDimension.width === 0 && widgetDimension.height === 0) {
			setIsChartLoading(true);
		} else {
			setIsChartLoading(false);
		}
	}, [widgetDimension]);

	return (
		<Style.ChartContainer ref={chartContainerRef}>
			{isChartLoading ? (
				<Style.ChartLoadingIndicator>차트 로딩 중...</Style.ChartLoadingIndicator>
			) : (
				<>
					<TradingViewWidget
						width={widgetDimension.width}
						height={widgetDimension.height}
						symbol={ticker}
						theme={currentTheme}
					/>
					<small>※상단에 표시되는 가격과 차트에 표시되는 가격이 다를 수 있습니다.</small>
				</>
			)}
		</Style.ChartContainer>
	);
}
