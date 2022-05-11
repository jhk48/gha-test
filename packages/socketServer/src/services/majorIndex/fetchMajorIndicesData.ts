import axios, { AxiosError } from 'axios';
import { MajorIndexData } from '@portbullio/shared/src/types';
import envConfig from '@config';
import { FMPMajorIndexData } from '@types';
import logger from '@lib/winston';

interface MajorIndicesRes {
	data: FMPMajorIndexData[];
}

export default async function fetchMajorIndicesData(): Promise<MajorIndexData[] | null> {
	try {
		const { data }: MajorIndicesRes = await axios.get(
			`https://financialmodelingprep.com/api/v3/quote/%5EDJI,%5EGSPC,%5EIXIC?apikey=${envConfig.fmpApiKey}`
		);

		return data.map(({ symbol, price, change, changesPercentage }) => ({
			ticker: symbol.replace('^', ''),
			price,
			change,
			changePercent: changesPercentage
		}));
	} catch (error) {
		const err = error as AxiosError;
		logger.error(`fetchMajorIndicesData.ts: ${err.message}`);
		return null;
	}
}
