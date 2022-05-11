import axios, { AxiosRequestConfig } from 'axios';
import { StockTransactionLog, StockTransactionType, CashTransactionLog } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

export interface AddStockTransactionArgs {
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	relateCash: boolean;
	avgBuyCost?: number;
	date: string;
}

interface AddStockTransactionRes {
	data: {
		newStockTransaction: StockTransactionLog;
		newCashTransaction?: CashTransactionLog;
		holdingsOfTicker: Holding[];
	};
}

export async function addStockTransaction({
	portfolioId,
	ticker,
	price,
	quantity,
	type,
	relateCash,
	avgBuyCost,
	date
}: AddStockTransactionArgs) {
	if (portfolioId === -1) throw new Error('Invalid portfolioId');
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({
		ticker,
		price,
		quantity,
		type,
		relateCash,
		avgBuyCost,
		date
	});

	const { data }: AddStockTransactionRes = await axios.post(
		`${apiServerUrl}/portfolios/${portfolioId}/holdings`,
		formData,
		config
	);

	return { ...data };
}
