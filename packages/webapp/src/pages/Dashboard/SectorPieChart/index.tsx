import { useRef, useEffect, useState } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { PieChart as PieChartIcon } from '@components/index';
import { useThemeMode } from '@hooks/index';
import { getHoldingsTickers } from '@utils';
import { SectorInfo, SectorPieChartRatio } from '@types';
import { ItemHeader, ItemIconContainer, NoticeEmptyHoldingsList } from '../styles';
import * as Style from './styles';
import { adjustToDpr } from '../utils';
import { drawPieChart, translateSectorToKor } from './utils';
import { useSectors } from './queries';
import SelectNumOfItems from '../SelectNumOfItems';
import DetailsPage from './SectorChartDetails';

import { sectorPieChartColors } from '../colors';

const MAX_NUM_OF_PIES = 7;

interface Props {
	holdingsList: Holding[];
}

export default function SectorPieChart({ holdingsList }: Props) {
	const [theme] = useThemeMode();
	const pieChartCanvasRef = useRef<HTMLCanvasElement>(null);
	const tickers = getHoldingsTickers(holdingsList);
	const sectors = useSectors();
	const sectorMap = initializeSectorMap(sectors.data ?? []);
	const [numOfPies, setNumOfPies] = useState(Math.min(sectorMap.size, MAX_NUM_OF_PIES));
	const sectorRatios = calcSectorRatios(sectorMap, tickers.length);
	const sectorChartData = convertToSectorChartData(sectorRatios, numOfPies);

	useEffect(() => {
		if (!pieChartCanvasRef.current) return;
		const pieChartCanvas = pieChartCanvasRef.current;
		const ctx = adjustToDpr(pieChartCanvas.getContext('2d'), pieChartCanvas);
		if (!ctx) return;

		adjustToDpr(ctx, pieChartCanvas);
		const { clientWidth: canvasWidth, clientHeight: canvasHeight } = pieChartCanvas;
		const [x, y] = [canvasWidth / 2, canvasHeight / 2];
		const radius = Math.min(canvasWidth, canvasHeight) / 2;

		drawPieChart({ ctx, theme, chartData: sectorChartData, x, y, radius });
	}, [theme, sectorChartData]);

	function isSectorsEmpty() {
		return sectorMap.size === 0;
	}

	return (
		<Style.SectorPieChartSection>
			<Style.SectorPieChartContainer>
				{!isSectorsEmpty() && (
					<SelectNumOfItems
						numOfItems={sectorMap.size}
						maxNumOfOptions={MAX_NUM_OF_PIES}
						optionValue={numOfPies}
						setterFn={setNumOfPies}
						labelText="섹터 개수: "
						selectElementId="select-num-of-sector-pie-items"
					/>
				)}
				<ItemIconContainer bgColor="blue">
					<PieChartIcon width={32} height={32} />
				</ItemIconContainer>
				<ItemHeader>섹터 구성</ItemHeader>
				{isSectorsEmpty() ? (
					<NoticeEmptyHoldingsList>
						표시할 섹터가 없습니다. 보유 종목을 추가해 주세요.
					</NoticeEmptyHoldingsList>
				) : (
					<Style.PieChartContainer>
						<Style.PieChartCanvas ref={pieChartCanvasRef} />
						<Style.LegendContainer>
							<Style.LegendList>
								{sectorChartData.map(({ sector, ratio }, idx) => (
									<Style.LegendListItem key={sector}>
										<Style.LegendColorBox backgroundColor={sectorPieChartColors(theme, idx)} />
										<Style.LegendItemText>
											{translateSectorToKor(sector)}&nbsp;&#40;{(ratio * 100).toFixed(2)}%&#41;
										</Style.LegendItemText>
									</Style.LegendListItem>
								))}
							</Style.LegendList>
						</Style.LegendContainer>
					</Style.PieChartContainer>
				)}
			</Style.SectorPieChartContainer>
			<DetailsPage
				chartData={sectorRatios}
				maxRatio={sectorRatios.at(0)?.ratio ?? 0}
				numOfPies={numOfPies}
			/>
		</Style.SectorPieChartSection>
	);
}

function initializeSectorMap(sectors: SectorInfo[]) {
	const result = new Map<string, string[]>(sectors.map(({ sector }) => [sector, []]));
	sectors.forEach(({ sector, ticker }) => result.get(sector)?.push(ticker));
	return result;
}

function calcSectorRatios(
	sectorMap: Map<string, string[]>,
	numOfHoldings: number
): SectorPieChartRatio[] {
	return [...sectorMap]
		.map(([sector, tickers]) => ({
			sector,
			ratio: tickers.length / numOfHoldings,
			includedStocks: [...tickers]
		}))
		.sort((a, b) => b.ratio - a.ratio);
}

function convertToSectorChartData(sectorRatios: SectorPieChartRatio[], numOfItems: number) {
	if (sectorRatios.length === numOfItems) return sectorRatios;

	const others: SectorPieChartRatio = {
		sector: '기타',
		ratio: sectorRatios.slice(numOfItems - 1).reduce((acc, el) => acc + el.ratio, 0),
		includedStocks: sectorRatios
			.slice(numOfItems - 1)
			.map(({ includedStocks }) => [...includedStocks])
			.flat()
	};

	return numOfItems === 1
		? [others]
		: [...sectorRatios.slice(0, numOfItems - 1), others].sort((a, b) => b.ratio - a.ratio);
}
