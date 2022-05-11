import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { getAssetChartData } from '@api/user';
import { AssetChartData } from '@types';

interface Props {
	portfolioId: number;
	count: number;
	currentWindow: {
		s: number;
		e: number;
	};
}

export default function useChartDataBuffer({ portfolioId, count, currentWindow }: Props) {
	const [chartDataBuffer, setChartDataBuffer] = useState<AssetChartData[]>([]);
	const lastDataIdx = useRef(0);
	const isReachedEnd = useRef(false);
	const isLoadingData = useRef(false);

	useLayoutEffect(() => {
		lastDataIdx.current = 0;
		isReachedEnd.current = false;
		isLoadingData.current = false;
	}, [portfolioId]);

	useLayoutEffect(() => {
		if (isLoadingData.current) return;

		(async () => {
			isLoadingData.current = true;

			const initialChartData = await getAssetChartData({
				portfolioId,
				start: new Date(Date.now() + 1000 * 60 * 60 * 24).toJSON().slice(0, 10),
				count: count * 2
			});
			setChartDataBuffer(initialChartData);

			isLoadingData.current = false;
			if (initialChartData.length < count * 2) isReachedEnd.current = true;
			lastDataIdx.current =
				initialChartData.length >= count ? count - 1 : initialChartData.length - 1;
		})();
	}, [portfolioId, count]);

	useEffect(() => {
		if (chartDataBuffer.length === 0) return;
		if (lastDataIdx.current === 0) return;
		if (isLoadingData.current) return;
		if (currentWindow.e <= lastDataIdx.current) return;
		if (isReachedEnd.current) return;

		(async () => {
			isLoadingData.current = true;

			const additionalChartData = await getAssetChartData({
				portfolioId,
				start: chartDataBuffer.at(-1)!.createdAt.slice(0, 10),
				count
			});
			setChartDataBuffer(prev => [...prev, ...additionalChartData]);

			isLoadingData.current = false;
			if (additionalChartData.length < count) isReachedEnd.current = true;
			lastDataIdx.current += count;
		})();
	}, [chartDataBuffer, currentWindow, portfolioId, count]);

	return { chartDataBuffer, isReachedEnd };
}
