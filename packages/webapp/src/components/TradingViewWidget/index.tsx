import { useEffect } from 'react';
import styled from 'styled-components';
import { Theme } from '@types';

declare const TradingView: any;

interface Props {
	width: number;
	height: number;
	symbol: string;
	theme: Theme;
}

export default function TradingViewWidget({ width, height, symbol, theme }: Props) {
	useEffect(() => {
		/* eslint-disable new-cap */
		/* eslint-disable no-new */
		new TradingView.widget({
			width,
			height,
			symbol,
			interval: 'D',
			timezone: 'Asia/Seoul',
			theme,
			style: '1',
			locale: 'en',
			toolbar_bg: '#f1f3f6',
			enable_publishing: false,
			allow_symbol_change: true,
			container_id: 'tv-widget-container'
		});
	}, [width, height, symbol, theme]);

	return <WidgetContainer id="tv-widget-container" />;
}

const WidgetContainer = styled.div`
	display: flex;
	width: fit-content;
`;
