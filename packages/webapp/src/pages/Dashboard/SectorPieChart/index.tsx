import { useRef, useEffect, useState } from 'react';
import { Holding } from '@portbullio/shared/src/types';
import { PieChart as PieChartIcon } from '@components/index';
import { useThemeMode } from '@hooks/index';
import { formatNum, getHoldingsTickers } from '@utils';
import { ItemHeader, ItemIconContainer, NoticeEmptyHoldingsList } from '../styles';
import * as Style from './styles';
import { adjustToDpr } from '../utils';
import {
	calcSectorRatios,
	convertToSectorChartData,
	drawPieChart,
	initializeSectorMap,
	translateSectorToKor
} from './utils';
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
											{translateSectorToKor(sector)}&nbsp;&#40;{formatNum(ratio * 100)}%&#41;
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
