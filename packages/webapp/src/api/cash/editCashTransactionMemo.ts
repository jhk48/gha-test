import axios, { AxiosRequestConfig } from 'axios';
import { CashTransactionLog } from '@prisma/client';
import envConfig from '@configs/env';

export interface EditCashTransactionMemoArgs {
	cashTransactionId: number;
	newMemo: string;
}

interface EditCashTransactionMemoRes {
	data: {
		editedCashTransaction: CashTransactionLog;
	};
}

export async function editCashTransactionMemo({
	cashTransactionId,
	newMemo
}: EditCashTransactionMemoArgs) {
	const { apiServerUrl } = envConfig;

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	};

	const formData = JSON.stringify({ memo: newMemo });
	const { data }: EditCashTransactionMemoRes = await axios.patch(
		`${apiServerUrl}/portfolios/cash/${cashTransactionId}/memo`,
		formData,
		config
	);
	return data.editedCashTransaction;
}
