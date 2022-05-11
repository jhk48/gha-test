import { useRef, useEffect, useState } from 'react';
import { CashTransactionLog } from '@prisma/client';
import { ClientStockRealtimeData, Holding } from '@portbullio/shared/src/types';
import { useThemeMode } from '@hooks/index';
import { BarChartAsc as BarChartAscIcon } from '@components/index';
import { calcTotalCashAmount } from '@utils';
import { ItemHeader, ItemIconContainer, NoticeEmptyHoldingsList } from '../styles';
import * as Style from './styles';
import { adjustToDpr } from '../utils';
import { MAX_NUM_OF_BARS } from './constants';
import DetailsPage from './ProportionChartDetails';
import {
	drawAxis,
	drawHorizontalGrid,
	drawBars,
	calcBarGeometry,
	transformToBarData,
	truncateToNumOfBars
} from './utils';
import SelectNumOfItems from '../SelectNumOfItems';

interface Props {
	holdingsList: Holding[];
	realtimeData: ClientStockRealtimeData;
	cashTransactions: CashTransactionLog[];
}

export default function ProportionByValue({ holdingsList, realtimeData, cashTransactions }: Props) {
	const [theme] = useThemeMode();
	const barCanvasRef = useRef<HTMLCanvasElement>(null);
	const totalCashAmount = calcTotalCashAmount(cashTransactions);
	const [numOfBars, setNumOfBars] = useState(Math.min(holdingsList.length + 1, MAX_NUM_OF_BARS));
	const originalBarData = transformToBarData(realtimeData, holdingsList, cashTransactions);
	const barData = truncateToNumOfBars(originalBarData, numOfBars);
	const maxRatio = barData.at(0)?.ratio ?? 0;

	useEffect(() => {
		if (!barCanvasRef.current) return;
		const barCanvas = barCanvasRef.current;
		const ctx = adjustToDpr(barCanvas.getContext('2d'), barCanvas);
		if (!ctx) return;

		const canvasWidth = barCanvas.clientWidth;
		const canvasHeight = barCanvas.clientHeight;
		const barGeometries = calcBarGeometry({
			barData,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight,
			numOfBars
		});

		drawAxis({
			ctx,
			theme,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight
		});

		drawHorizontalGrid({
			ctx,
			theme,
			maxValue: maxRatio,
			canvasWidth,
			canvasHeight
		});

		drawBars({ ctx, theme, barData: barGeometries, canvasHeight });
	}, [maxRatio, theme, barData, numOfBars]);

	function isHoldingsEmpty() {
		return numOfBars === 1 && totalCashAmount <= 0;
	}

	return (
		<Style.ProportionByValueSection>
			<Style.ProportionByValueChartContainer>
				{!isHoldingsEmpty() && (
					<SelectNumOfItems
						numOfItems={holdingsList.length + 1}
						maxNumOfOptions={MAX_NUM_OF_BARS}
						optionValue={numOfBars}
						setterFn={setNumOfBars}
						labelText="종목 개수: "
						selectElementId="select-num-of-bar-items"
					/>
				)}
				<ItemIconContainer bgColor="blue">
					<BarChartAscIcon width={20} height={20} />
				</ItemIconContainer>
				<ItemHeader>종목 구성</ItemHeader>
				{isHoldingsEmpty() ? (
					<NoticeEmptyHoldingsList>
						표시할 종목이 없습니다. 보유 종목 혹은 현금 거래내역을 추가해 주세요.
					</NoticeEmptyHoldingsList>
				) : (
					<Style.ProportionByValueChartCanvas ref={barCanvasRef} />
				)}
			</Style.ProportionByValueChartContainer>
			<DetailsPage
				chartData={originalBarData}
				maxRatio={originalBarData.at(0)?.ratio ?? 0}
				numOfBars={numOfBars}
			/>
		</Style.ProportionByValueSection>
	);
}
