import axios, { AxiosRequestConfig } from 'axios';
import { StockTransactionLog, StockTransactionType } from '@prisma/client';
import { Holding } from '@portbullio/shared/src/types';
import envConfig from '@configs/env';

export interface EditStockTransactionArgs {
	stockTransactionId: number;
	portfolioId: number;
	ticker: string;
	price: number;
	quantity: number;
	type: StockTransactionType;
	avgBuyCost?: number;
	date: string;
}

interface EditStockTransactionRes {
	data: {
		modifiedStockTransaction: StockTransactionLog;
		holdingsOfTicker: Holding[];
	};
}

export async function editStockTransaction({
	stockTransactionId,
	portfolioId,
	ticker,
	price,
	quantity,
	type,
	avgBuyCost,
	date
}: EditStockTransactionArgs) {
	if (portfolioId === -1) throw new Error('Invalid portfolioId');
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ ticker, price, quantity, type, avgBuyCost, date });
	const { data }: EditStockTransactionRes = await axios.patch(
		`${apiServerUrl}/portfolios/${portfolioId}/holdings/${stockTransactionId}`,
		formData,
		config
	);
	return { ...data };
}
