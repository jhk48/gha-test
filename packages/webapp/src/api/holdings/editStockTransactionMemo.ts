import axios, { AxiosRequestConfig } from 'axios';
import { StockTransactionLog } from '@prisma/client';
import envConfig from '@configs/env';

export interface EditStockTransactionMemoArgs {
	stockTransactionId: number;
	newMemo: string;
}

interface EditStockTransactionMemoRes {
	data: {
		result: StockTransactionLog;
	};
}

export async function editStockTransactionMemo({
	stockTransactionId,
	newMemo
}: EditStockTransactionMemoArgs) {
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ memo: newMemo });
	const { data }: EditStockTransactionMemoRes = await axios.patch(
		`${apiServerUrl}/portfolios/holdings/${stockTransactionId}/memo`,
		formData,
		config
	);
	return data.result;
}
